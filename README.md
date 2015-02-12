Installation:
===

`npm install`

##Start server:

To start the server run `npm start`.

After server has been started go to http://localhost:8080/scripts/bundles?modules={comma seperated module names}
Where module names are the file names in app/scripts.

Sample call: [http://localhost:8080/scripts/bundle?modules=modone,modtwo](http://localhost:8080/scripts/bundle?modules=modone,modtwo)

**Note: lib and main module are default loaded thus don't call them again.**

Since module now supports reading arguments from command line. Thus command line can also manipulate behaviour of build. e.g. if we run our server with `node server.js --optimize uglify2` it will gived uglified module as build output.

##TODO

Handle the case to not allow files outside baseUrl or outside app folder or whatever config says. Like if not handles I could give module name as ../../server which will fetch server.js file in project directory

Read requireConfig to config file. May be package.json or other config file.

Seperate out require specific code from server.js file. And move it to module so that it can be used as cli also.
