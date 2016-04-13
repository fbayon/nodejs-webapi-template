# nodejs-webapi-template
Template project for nodejs webapi


## Modules

It's a handler for URL. 

All modules autoload from folder "modules".
Each module of "app.modules" must implement:

* **Bootstrap(app)** initial config for module 
* **Configure()** get object with the config like  "{ moduleURL: "/login/", depends: ["data"] }"


## Services

It's a services for application. 

All services autoload from folder "services".
Each services of "app.services" must implement:

* **Bootstrap(app)** initial config for service 
* **Configure()** get object with the config like  " { "as": "auth" }", the "as" attribute is de name of service.
