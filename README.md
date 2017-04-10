# Toy Robot Simulator

## Description


* The application is a simulation of a toy robot moving on a square table-top, of dimensions 5 units x 5 units
* There are no other obstructions on the table surface
* The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed

## Configurations

In order to run the app
* Please install NodeJs
* Please install npm
* It is optional to install dependencies as they are dev dependencies used for eslint
* You should then be able to run ```npm start``` to run the app:

In order to test the app:

* Please install jasmine
``` npm install -g  jasmine```
* Then you should be able to run:
```javascript
jasmine //To run all tests
jasmine spec/robot-spec.js //To run robot class tests
jasmine spec/playground-spec.js //To run playground class tests
jasmine spec/message-manager-spec.js //To run messageManager class tests
```

## App specifications

* PLACE will put the toy robot on the table in position X, Y and facing NORTH, SOUTH, EAST or WEST
* The origin (0,0) can be considered to be the SOUTH WEST most corner
* The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed
* MOVE will move the toy robot one unit forward in the direction it is currently facing
* LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot
* REPORT will announce the X, Y and F of the robot. This can be in any form, but standard output is sufficient
* A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands
* Input can be from a file, or from standard input, as you choose
* Provide test data to exercise the application

## Constraints

* The toy robot must not fall off the table during movement. This also includes the initial placement of the toy robot
* Any move that would cause the robot to fall off the table-top must be ignored

## APP structure

The app has four classes:
* Robot: responsible for representing a robot and its methods. Robot is dependent on MessageManager and Playground classes. 
* Playground: resobnsible for representing a playground where robot is placed and moved on. 
* MessageManager: responsible for preparing any message that robot needs to show to the user
* ToyRobotProgram: is responsible for running the app by instantiating a new robot and taking care of user interactions

```properties.js```: is an object that holds static data being used by Robot, MessageManager, Playground classes

```app.js```: takes care instantiating the ToyRobotProgram and calling its run method to start the app

```index.js```: It is the starting point of our NodeJs app which creates a new instance of App class