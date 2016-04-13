# nodejs-webapi-template
Template project for nodejs webapi


## Modules

Is a handler for URL. 

All modules autoload from folder "modules", each service add to "app.modules.<nameofmodule>".
each module should implement

* **Bootstrap(app)** initial config for module 
* **Configure()** get object with the config like  "{ moduleURL: "/login/", depends: ["data"] }"


## Services

Is a services for application. 

All services autoload from folder "services", each service add to "app.services.<nameofservice>".
each service should implement

* **Bootstrap(app)** initial config for service 
* **Configure()** get object with the config like  " { "as": "auth" }", the "as" attribute is de name of service.