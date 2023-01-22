# JavaScript Closures

Variables that are declared with the "var" keyword belong to the scope of the function in which they are defined. 
However the term *scope* can be confusing. There is a *lexical scope* and a *runtime scope* and these can be different. 

With lexical scope we refer to the boundaries of the function as they exist in the source code. 
The runtime scope on the other hand is much like a stack frame of a function invocation. 

When we define a nested function inside another function we have a closure. We can refer to variables of the outer from the inner. 
A closure can be thought as an object that contains references to both a *function definition* as well as the *runtime scope chain* that was in effect when the function was created. 
When we use a variable of an outer function from an inner function, this scope chain is examined in order to resolve its value. 

In the following first example, an inner function uses a variable "i" that is defined in an outer function. 
The fact that the variable is declared in for-loop brackets is not important. The variable scope is the function in which the loop also exists. 
Inside the loop a closure is created for the inner function. However when it will be invoked, the execution of the outer function will have been completed and the variable will have a final value. 

This is obviously not what we expect. To solve this we create in the below example an intermediate function that wraps our prior nested function. 
Most importantly this intermediate is *executed* at each step of the loop and as such it creates a distinct runtime scope for the variables and the closure it now contains. 

#### Output will be 10 for all invocations.

```
function outer() {
	for (var i = 0; i < 10; i++) {
		setTimeout(function() {
			console.log(i); // <-- executed after loop finishes
		}, 1000);
	}
}
```

#### Capture values of i with intermediate closure, at each step.

```
function outer() {
	for (var i = 0; i < 10; i++) {
		(function(j) {
			setTimeout(function() {
				console.log(j);
			}, 1000);
		})(i); // <-- creates a separate scope for each step of the loop
	}
}
```

#### ES6!

```
function outer() {
	for (let i = 0; i < 10; i++) {
		setTimeout(() => {
			console.log(i);
		}, 1000);
	}
}
```
