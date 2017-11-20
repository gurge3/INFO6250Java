# HttpProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Packages to install
Run at project level

npm install --save bootstrap@4.0.0-alpha.6 
npm install --save jquery 
npm install --save font-awesome
npm install --save underscore
npm install --save @types/underscore

--save update bower.json

### Update /* angular-cli.json */

"styles": [
        "styles.css",
        "../node_modules/bootstrap/dist/css/bootstrap.min.css",
 	"../node_modules/font-awesome/css/font-awesome.css"
],
"scripts":[
	"../node_modules/jquery/dist/jquery.min.js",
    	"../node_modules/bootstrap/dist/js/bootstrap.min.js",
	"../node_modules/underscore/underscore.js"
]


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
