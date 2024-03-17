

# MyChatBot

## How to install an Angular 17.3 application 
First make sure you have installed nodejs and npm. A minimum version is needed. For Angular 17.3 you need at least nodejs 18.13.0 or a newer version;
Here is my stack: https://github.com/TudiDotCom/chat-bot-insider/blob/main/my_angular_version.png

1. Install nodejs and npm; https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Check version:
- To check nodejs version: node --version
- To check npm: npm --version 

2. Install Angular CLI:
- npm install -g @angular/cli
- check version: ng version

3. Clone the project: git clone https://github.com/TudiDotCom/chat-bot-insider.git

4. Open the folder with the project and run "npm install" - to install the dependencies

5. Run the project in the browser: "ng serve"
Then open http://localhost:4200/ in a browser to view the project.


###
I know there are bugs due to my ".includes()" functions when comparing the names of the strings. I left it like this to make testing easier.
I should probably implement an algorithm to test "how much" the strings are alike, but I
was past the 2 hours (maybe Levenshtein distance) and then send a message with a proposal("Did you want to say ...?") 


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

