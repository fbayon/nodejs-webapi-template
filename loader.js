/// <reference path="typings/main.d.ts" />
var fs = require("fs");
var path = require("path");

function ContainsObject(array, object) {
    var ret = false;
    array.forEach(function(element) {
        if (element == object) {
            ret = true;
        }
    }, this);

    return ret;
}


function load(container, containerFolder, mainjs, onLoad, objectToLoad) {
    var objects;
    if (Array.isArray(objectToLoad)) {
        objects = objectToLoad;
    } else {
        if (!fs.existsSync(containerFolder)) {
            return;
        }
        objects = fs.readdirSync(containerFolder);
    }

    var objectsLoaded = objects.length;
    var actualLoaded = 0;
    var loadSome = false;
    do {
        loadSome = false;
        objects.forEach(function(folder) {
            if (container[folder] === undefined) {
                var objRef = folder;
                var jsToLoad = path.join(containerFolder, folder, mainjs + ".js");
                var toLoad = require(jsToLoad);
                var canLoad = true;
                if (toLoad.Config !== undefined) {
                    var config = toLoad.Config();
                    if (config.depends != undefined) {
//TODO check multiple depends
                        config.depends.forEach(function(element) {
                            if (!ContainsObject(Object.keys(container), config.depends[0])) {
                                canLoad = false;
                            }
                        }, this);
                    }
                    if(config.as !==undefined){
                        objRef = config.as;
                    }
                }
                if (canLoad) {
                    onLoad(toLoad);
                    container[objRef] = toLoad;
                    actualLoaded++;
                    loadSome = true;
                    console.log("load " + folder + " as " + objRef);
                }
            }
        }, this);

        if (loadSome === false) {
            throw new Error("Error in depens for " + containerFolder);
        }

    } while (objectsLoaded != actualLoaded);

}

exports.LoadModules = function(app, modulesToLoad) {
    app.modules = {};
    load(app.modules, path.join(__dirname, "./modules/"), "module", function(obj) {
        obj.Bootstrap(app);
    }, modulesToLoad)
}

exports.LoadServices = function(app, servicesToLoad) {
    app.services = {};
    load(app.services, path.join(__dirname, "./services/"), "service", function(obj) {
        obj.Bootstrap(app);
    }, servicesToLoad)
}
