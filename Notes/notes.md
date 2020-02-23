# Learn and Understand NodeJS By: Anthony Alicea

Simply typing _node_ into the Terminal starts up the Node CLI.

From this point you can start typing JavaScript in the terminal and have it run. Everything you type into the Node CLI will be ran through the JavaScript V8 Engine.

To run your program in **NodeJS** you simply point to the file you would like to run by passing it as an argument in the Terminal. This file could pull and use _multiple_ files, but NodeJS needs a single entry point. `node app.js`

In JavaScript, there is a _console.log()_ feature that runs in the browser, but it also runs on _Node_

### Breakpoint:

- A spot in your code where you tell a debugging tool to pause the execution of our code.
  - This helps you figure out what's going on.

###### Side Note

- As a side note, what makes _Visual Studio Code_ appealing and useful to _NodeJS,_ is the ability to debug your code inside of VSC, and use Node to run that code to debug.

### Modules, Exports, and Require

**Module**

- A reuseable block of code whose existence does not accidentally impact other code.

- Before the ES6 specification, JavaScript did not have this feature.

**_CommonJS Modules_**

- CommonJS is just an agreed upon standard for how code modules should be structured. So when you hear the term _CommonJS,_ it is just a standard, not a library or framework.

### First-Class Functions and Function Expressions

**First Class Functions**

- Everything you can do with other types, you can do with Functions.

  - You can use functions like strings, number, etc. (i.e pass them around, set variables equal to them, put them in arrays, and more)

    - Other programming languages don't have _First Class Functions._ This allows JavaScript to have some interesting patterns of code.

      - It allows allows you to write _function expressions_

### Function Expressions

- An _expression_ just means a _block of code_ that _results in a value._

- _Function Expression_ are possible in JavaScript because _functions are first-class_.

**Invoke** just means run the function, also referred to as _"calling"_ the function.

## Creating a Module

Modules are a way of breaking up your code and making it more "Modular" and "Reuseable".

In this sense, you can create multiple JavaScript files, that contain the code for different things, and pull that code into a single file. _Think of SASS imports_

NodeJS makes this possible by supplying a function in it's core called _"Require"_

_Require_ is a function, and what you pass to the function is a string.

That _string_ is the _location_ or _name_ of the file you with to import and use, inside of that file.

```js
require('./greet.js');
```

Variables, Functions etc, cannot be used or called from another module. This is by design. This way, things cannot collide with each other in various modules.

You could use the same name from one module, in another module, and the 2 will not collide. Modules themselves are _self-contained_

You could however, explicitly tell NodeJS to make variable names available throughout the modules.

_module.exports_ is a special variable, or object, it's just a special place to put things, that you want to explicitly make available throughout the other modules or the whole application.

```js
module.exports = greet;
```

_ONLY_ the things attached to the module.exports will be made available.

### Objects and Object Literals

**Name/Value Pair**

- A name which maps to a value.
- The name may be defined more than once, but only can have one value in any given _context._
- That value may be more name/value pairs.

**Object**

- A collection of name/value pairs.
- This is the simplest definition when talking about JavaScript.

Objects actually sit in memory and _point_ to other values.

- Primitive "property"
- Object "property"
- Function "method"

**Object Literal**

- Name/Value pairs separated by commas and surrounded by curly braces.

- This is just quick, shorthand way to create JavaScript objects in code.

```js
var person = {
  firstname: 'Anthony',
  lastname: 'Eriksen',
  greet: function() {
    console.log('Hello, ' + this.firstname + ' ' + this.lastname);
  }
};
person.greet();

console.log(person['firstname']);
console.log(person.firstname);
```

### Prototypal Inheritance and Function Constructors

**Inheritance**

- When one Object, gets access to the properties and methods of another Object.

The only JavaScript implements _Inheritance_ is a bit different from other programming languages. It uses _Prototypal Inheritance_

**Function Constructors**

- A normal function that is used to construct objects.

### By Reference and By Value

**Primitive**

- A type of data that represents a single value.
- Number, String, or a boolean. NOT AN OBJECT.

If working with a function, that takes in a parameter, let's say a "b" parameter, and you have a variable, "a" that holds a _primitive value_ let's say a number, and inside that function you set the "b" parameter, to the "a" variable, the "b" parameter stores a _COPY_ of that primitive value. This is called **By Value**

```js
var a = 1;

function(b) {
  b = a;
}

// Example
// a -> 0x001 -> 1
// b -> 0x002 -> 1

// b is storing a copy of a's value in a new spot in memory
```

But, when working with an _Object_ and you assign "b" to "a", which "a" is a variable pointing to the Object, "b" will point to that same Object. It points to the same place in memory instead of creating it's own copy of the object. This is called **By Reference**

```js
var a = {
  firstname: 'Anthony'
}

function(b) {
  b = a;
}

// Example
// a -> 0x001 -> 1
// b -> 0x001 -> 1

// b is storing a copy of a's value in a new spot in memory
```

```js
// pass By Value
function change(b) {
  b = 2;
}

var a = 1;
change(a);
console.log(a); // 1

// a is set to 1, when the change function is executed, b creates a new copy of 1, which is a's value, and stores it in a new spot in memory. So when b =2, that NEW location in memory is set to 2, while a is still pointing to the other location in memory which is set to 1.

console.log('-----------------------------');

// pass By Reference
function changeObj(d) {
  d.prop1 = function() {};
  d.prop2 = {};
}

var c = {};
c.prop1 = {};
changeObj(c);
console.log(c);

// When we give the "c" object a property, "prop1" which is an Object, and then pass it to the changeObj function. The "d" parameter is then pointing to the SAME location in memory as "c". So when we assign d.prop1 to a function, it is actually overwriting that the "c" objects prop1 and setting it to a function. This is because "d" essentially IS "c". It is pointing to the exact SAME place in memory as "c". So within the changeObj function, anything you do, to d, will result in a change in "c".

// Also, if you have many variables, pointing to the same location in memory, changing one changes them ALL!
```

NodeJS takes advantage of this feature for the _"Require"_ function for JavaScript Modules.

### Immediately Invoked Function Expressions (IIFE)

**Scope**

- Where in code, you have access to a particular variable or function.

```js
(function() {
  var firstname = 'Anthony';
  console.log(firstname); // Anthony
})();

var firstname = 'Debra';
console.log(firstname); // Debra
```

By wrapping the function in parenthesis, you are telling the JavaScript Engine that this is an _Expression_, and by calling that function directly after it's creation, you are _Immediately Invoking_ the function.

A benefit to doing this is that it some a "shorthand" for writing functions. Instead of having to name the function, and call it, you can wrap it in parenthesis and invoke it immediately afterwards.

Another reason for using this is for _Scoping_ all variables, and/or functions, that are created within a function, are _Scoped_ to that function. Meaning they aren't accessible from outside the functions context.

You will find this pattern often in libraries and frameworks. The very first thing you will see is an _Immediately Invoked Function Expression_ wrapping all of the code. This _encapsulates_ the library or frameworks code within it's own _context_. It can prevent it's code from clashing with your code. It keeps the library self contained, and makes available only things that it wants or needs to make available in order to effectively use it and it's features.

This is also how modules in effectively work in NodeJS. Developers have been "faking" modules by using the power of Immediately Invoked Function Expressions, to wrap the context of a specific block, or file of code.

**Require** is a function, that you pass a _path_ to.
**module.exports** is what the _require_ function _returns_
This works because your code is actually _wrapped in a function_ that is given these things as function parameters.

### JSON

**JavaScript Object Notation**

- JSON is a standard for structuring data that is inspired by JavaScript Object Literals.

- JavaScript Engines are built to understand it.

JSON looks _EXACTLY_ like an Object Literal, except you don't give them functions, or _methods_, likewise, you also wrap all the _names and values_ in quotes.

```json
{
  "firstname": "Anthony",
  "lastname": "Eriksen",
  "address": {
    "street": "101 Main St.",
    "city": "New York",
    "state": "NY"
  }
}
```

JSON names can also take in OTHER object literals as values, just like Objects. The JavaScript Engine can then take these as _text_ and convert them into an Object.

### Module Patterns

**Revealing Module Pattern**

- Exposing only the _properties_ and _methods_ you want via a returned object.

- A very common and clean way to structure and protect code within modules.

_See modulePatterns/greet5.js for an example of this_

### Exports and module.exports

Remember, when our code is ran through node, it's wrapped in, a _Function Expression_

**Mutate**

- To change something
- For example adding or changing a property or method on an Object is _mutating_ the Object.

**JUST USE MODULE.EXPORTS**

### Requiring Native(CORE) Modules

The Native or Core modules are the NodeJS API. You can check the various core modules in the documentation on the NodeJS website. If you are, or going to be a NodeJS Developer, you should read them. You should familiarize yourself with the various core modules, what they do, and how to use them.

To use them is simple. You just require them. You wouldn't need to add the " ./ " in the Require function, since that tells NodeJS to look in the current directory for it. You just name the module, and if it matches a NodeJS module, that's what it uses.

```js
var util = require('util');
```

NodeJS will look within itself, for a "util" file, which is the _Utilities_ module. You still don't need to add a .js extension as NodeJS already expects whatever you are requiring, to be a JavaScript file.

So, _Require_ not only let's use pull in our own custom modules, but also core modules from NodeJS.

### Modules and ES6

NodeJS added the idea, or feature of _Modules_ to JavaScript because it didn't have it, and you need the ability to seperate your code in a modular structure, when building large scale applications.

Now, the JavaScript specification itself (ES6), includes this feature.

However, there are still many applications that use NodeJS modules.

The ES6 version of modules are a similar structure.

If you want to export something from a JavaScript file, for example a function, you can add the _export_ keyword in front of it. and _import_ it into the file you would like to use it in.

```js
export function greet() {
  console.log('Hello');
}

import * as greetr from 'greet';
greetr.greet();
```

In this example the asterisk(\*) is just pulling ALL exports as "greetr" from the _greet_ file, but you can be more specific, and import only specific items you need, and rename them, using the _as_ statement.

Then you end up with a variable, as the the thing that was exported.

But both ES6 and NodeJS Modules are relatively the same. Exporting a module, that contains some code you want to be _protected_ and explicitly importing only the things you want to be made available.

### Web Server Checklist

_These are some things that JavaScript needs or needed in order to manage a server._

- Better ways to organize code into reusable pieces.
- Ways to deal with Files.
- Ways to deal with Databases.
- The ability to communicate over the internet.
- The ability to accept Requests and Send reponses.
- A way to deal with Work that takes a Long Time.

### Events and the Event Emitter

**Event**

- Something that has happened in our application that we can respond to.
- In Node there are actually two different kinds of events.

  - _System Events_ - Comes from the C++ core that deals with the Computer System.

  - _Custom Events_ - Inside the JavaScript Core. Events that can be created using JavaScript. **This is the _Event Emitter_**

### Object Properties, First Class Functions, and Arrays

**Event Listener**

- The code that responds to an event.
- In JavaScript, the Listener will usually be a Function.

**Magic String**

- A string that has some special meaning in our code.
- This is bad because it makes it easy for a typo to cause a bug, and hard for tools to help us find it.

This is 1 problem with Event Emitters in NodeJS. They rely on matching _strings_ to match an event. If the strings don't match, the event doesn't run. Unlike a variable where if the variable is wrong it will throw an error.

A really nice way to approach this problem, especially when working with a large team, is to create a new "config" module.

Inside this module, you can export out a new object that holds an _events_ object that has properties, and have the event strings assigned to them.

```js
module.exports = {
  events: {
    GREET: 'greet'
  }
};
```

So instead of using 'greet' for all of the events, we can assign them to a GREET property in a config file. This is extremely helpful, and makes it easier to debug if something goes wrong.

So then when you require the config files

```js
var eventConfig = require('./config').events;
```

You can easily access the corresponding event that you needs. We capitalized the event here to make it standout as the Event itself.

```js
emtr.on(eventConfig.GREET, function() {
  console.log('Greet was triggered!');
});
```

So now instead of always passing the actual string 'greet' everytime, we can access and pass the string like this.

### Object.create() and Prototypes

There are several ways to setup the _prototype_ and the _prototype chain_

- Constructors
- Classes (ES6)
- _object.create()_

```js
var person = {
  firstname: '',
  lastname:",
  greet: function() {
    return this.firstname + ' ' + this.lastname;
  }
}

var anthony = Object.create(person);
```

Creating Objects in this way, you can write a normal object literal and when you use _Object.create()_ you are creating a new _empty object_ and setting its prototype, to the Object you passed into the _create()_ method.

You can overwrite the prototype, by setting properties and methods of the same name, directly to the prototype.

```js
anthony.firstname = 'Anthony';
anthony.lastname = 'Eriksen';
```

You can do this to create multiple objects that all point to _person_ as their prototype.

```js
var person = {
  firstname: '',
  lastname: '',
  greet: function() {
    return this.firstname + ' ' + this.lastname;
  }
};

var anthony = Object.create(person);
anthony.firstname = 'Anthony';
anthony.lastname = 'Eriksen';
console.log(anthony);

var vincent = Object.create(person);
vincent.firstname = 'Vincent';
vincent.lastname = 'Eriksen';
console.log(vincent.greet()); // Vincent Eriksen
console.log(anthony.greet()); // Anthony Eriksen
```

Both the "vincent" and "anthony" objects have access to the _greet()_ method. In this case, they also have access to the same properties.

This a fast, clear, and simple way, to set the prototype, and the prototype chain.

### Inheriting from the Event Emitter

The _prototype chain is inheritance_

- _Function Constructors_ - .prototype property of that function is what all objects created from that function constructor point to as _their_ prototype.

- _Classes (ES6)_ - Extends

- _Object.create()_ - Pass an object literal into the create() method to point to for all the Objects created by Object_create() as their prototype.

```js
var EventEmitter = require('events');
var util = require('util');

function Greetr() {
  this.greeting = 'Hello World'; // Constructor Function
}

util.inherits(Greetr, EventEmitter); // Inherit from the Event Emitters prototype. Any Objects created with the Constructor Function gets access to these properties and methods via the prototype chain.

Greetr.prototype.greet = function() {
  // Add own custom method to Greetr objects prototype
  console.log(this.greeting);
  this.emit('greet');
};

var greeter1 = new Greetr(); // Creates a new Object from the Greetr Constructor Function

greeter1.on('greet', function() {
  // Uses the "on" method from the Event Emitter that we inherited through the prototype chain.
  console.log('Someone greeted!');
});

greeter1.greet(); // Calls the 'greet' event functioncreated in the "on" method.
```

### Node, ES6, and Template Strings

**Template Literal**

- A way to concatenate strings in JavaScript.

### call() and apply()

Call and Apply do essentially the same thing, invoke a function assigning the "this" keyword to another context, and pass in parameters.

Call, takes parameters _comma seperated_
Whereas Apply, takes parameters inside of an array

.call(obj, param1, param1)
.apply(obj, [param1, param2]);

.bind just binds the "this" keyword to a specific context.

### Inheriting from the Event Emitter

### ES6 Classes

```js
'use strict';

class Person {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  // Stored on the Prototype
  greet() {
    console.log('Hello, ' + this.firstname + ' ' + this.lastname);
  }
}

var anthony = new Person('Anthony', 'Eriksen');
anthony.greet();

var debra = new Person('Debra', 'Thompson');
debra.greet();

console.log(anthony.__proto__);
console.log(debra.__proto__);
console.log(anthony.__proto__ === debra.__proto__);
```

### Inheriting from the Event Emitter part 3

### JavaScript is Synchronous
