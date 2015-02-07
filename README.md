Installation:
===

`npm install`

##Start server:

To start the server run `npm start`.

After server has been started go to http://localhost:8080/scripts/bundles?modules={comma seperated module names}
Where module names are the file names in app/scripts.

Sample call: [http://localhost:8080/scripts/bundle?modules=modone,modtwo](http://localhost:8080/scripts/bundle?modules=modone,modtwo)

**Note: lib and main module are default loaded thus don't call them again.**
