// // function statement
// function greet() {
//   console.log('hi');
// }
// greet();

// // Functions are first class! You can pass them around like variables.
// function logGreet(fn) {
//   fn();
// }
// logGreet(greet);

// // Function Expression
// var greetMe = function() {
//   console.log('Hi Anthony');
// };
// greetMe();

// // Funtion Expressions are still first-class
// logGreet(greetMe);

// // Use a function expression on the fly
// logGreet(function() {
//   console.log('Hello Anthony');
// });

// Object Literal Syntax
// var person = {
//     firstname: 'Anthony',
//     lastname: 'Eriksen',
//     greet: function () {
//         console.log('Hello, ' + this.firstname + ' ' + this.lastname);
//     }
// };
// person.greet();

// console.log(person['firstname']);
// console.log(person.firstname);

// Creating Objects via a Function Constructor
function Person(firstname, lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
}

Person.prototype.greet = function() {
  console.log('Hello, ' + this.firstname + ' ' + this.lastname);
};

// Person.prototype.greet = function() {
//   console.log('Hello, ' + firstname + ' ' + lastname);
// };

// You must use the 'this' keyword to point to the object properties. Otherwise, the function will look for "firstname" and "lastname" variables, when we are trying to access Object properties.

// When an Object is created with a function constructor, the "this" keyword automatically points to an empty Object. In a function constructor, you are setting the properties and methods of that object, inside of the Function body. See lines 13 - 15

// Upon construction, the 'this' keyword then points to that Object's context. Using "this" you can access properties and methods stored in the prototype. See lines 18 - 19

var anthony = new Person('Anthony', 'Eriksen');
anthony.greet();

var debra = new Person('Debra', 'Thompson');
debra.greet();

// Both "Persons" have access to the SAME prototype. The protoype of the Function Constructors created Objects. The prototype is only used and accessable when OBJECTS are CREATED in this SPECIAL way, using a Function Constructor.

// ES6 Classes are a way to create Function Constructors easier, but when you see a JavaScript "Class" just remember, it's basically just an ES5 Function Constructor.

// var person = {
//   firstname: 'Anthony',
//   lastname: 'Eriksen',
//   greet: function() {
//     console.log('Hello, ' + this.firstname + ' ' + this.lastname);
//   }
// };
// person.greet();

// console.log(person['firstname']);
// console.log(person.firstname);

// function Person(firstname, lastname) {
//   this.firstname = firstname;
//   this.lastname = lastname;
// }

// Person.prototype.greet = function() {
//   console.log('Hello, ' + this.firstname + ' ' + this.lastname);
// };

// Person.prototype.greet = function() {
//   console.log('Hello, ' + firstname + ' ' + lastname);
// };

// You must use the 'this' keyword to point to the object properties. Otherwise, the function will look for "firstname" and "lastname" variables, when we are trying to access Object properties.

// When an Object is created with a function constructor, the "this" keyword automatically points to an empty Object. In a function constructor, you are setting the properties and methods of that object, inside of the Function body. See lines 13 - 15

// Upon construction, the 'this' keyword then points to that Object's context. Using "this" you can access properties and methods stored in the prototype. See lines 18 - 19

// var anthony = new Person('Anthony', 'Eriksen');
// anthony.greet();

// var debra = new Person('Debra', 'Thompson');
// debra.greet();

// Both "Persons" have access to the SAME prototype. The protoype of the Function Constructors created Objects. The prototype is only used and accessable when OBJECTS are CREATED in this SPECIAL way, using a Function Constructor.

// ES6 Classes are a way to create Function Constructors easier, but when you see a JavaScript "Class" just remember, it's basically just an ES5 Function Constructor.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Object properties and methods
// var obj = {
//   greet: 'Hello'
// };

// console.log(obj.greet);
// console.log(obj['greet']);
// var prop = 'greet';
// console.log(obj[prop]);

// // Functions and Arrays
// var arr = [];

// arr.push(function() {
//   console.log('Hello World 1');
// });
// arr.push(function() {
//   console.log('Hello World 2');
// });
// arr.push(function() {
//   console.log('Hello World 3');
// });

// arr.forEach(function(item) {
//   item();
// });

// Create own Event Emitter

function Emitter() {
  // Emitter Constructor Function
  this.events = {}; // Create "events" property and set to empty Object
}

Emitter.prototype.on = function(type, listener) {
  // Creates a new Method on the "Emitter" prototype called "on". The functions takes in a "type", and "listener" parameter.
  this.events[type] = this.events[type] || []; // Checks to see if it has this event type already, otherwise, create an empty Array.
  this.events[type].push(listener); // Pushes the Listener to the empty Array.
};

Emitter.prototype.emit = function(type) {
  // Creates a new method on the "Emitter" prototype called "emit". The function takes in a "type" parameter.
  if (this.events[type]) {
    // If this specific "event" exists,
    this.events[type].forEach(function(listener) {
      // Loop through the array inside that "event" property, and call each function in the array.
      listener(); // Call each function
    });
  }
};

module.exports = Emitter;

/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

var Emitter = require('./emitter');

var emtr = new Emitter(); // Creates a new Emitter Object

emtr.on('greet', function() {
  // Called the "on" method in the prototype, passing it the name 'greet' as the type, and a function expression as the listener.
  console.log('Somewhere, someone said hello.'); // Return from the function expression.
});

emtr.on('greet', function() {
  // Calls the "on" method in the prototype, passing it the name "greet" as the type, and a function expression as the listener.
  console.log('A greeting occurred!'); // Returned from the function expression.
});

console.log('Hello!'); // This is just "faking" an event that would trigger "greet"
emtr.emit('greet'); // Manually calling the "greet" event to fake an event occuring.

// When the "greet" event "occurs", the Emitter looks to see if it has a "greet" property on the "event" Object.
// It finds that it does, and then the value of that "greet" property is an ARRAY.
// The array is holding the Function Expressions created above using the ".on()" method we stored in the prototype.
// It runs forEach on the Array and calls each Function Expression in the Array.

// This is essentially how the Event Emitter works.
