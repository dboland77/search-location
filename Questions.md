# Question 1

setTimeout(function() {
console.log("1");
}, 100);

console.log("2");

## Reponse 1:

This will log "2" to the console followed by logging "1" to the console after 100 milliseconds.

setTimeout is an asynchronous function which means it will execute after the main execution stack is empty.

The 100 parameter is a _minimum_ time to execution.

The "2" will print first even if we set the 100 to 0 as it is on the main execution stack.

# Question 2

function foo(d) {
if(d < 10) {
  foo(d+1);
}
console.log(d);

}

foo(0);

## Response 2
This will dispaly a countdown timer from 10 to 0 in the console (so 10 then 9 then 8 etc..)

The if condition loops from the parameter d (passed in the call to foo as 0 up to but not including 10 due to <)

The function is called recursively with d incremented by 1 each time within the loop so 0 then 1 then 2 etc.. 

Once the if condition fails the function will stop the recursive calls and start to "unwind" from 10. (The function call takes precedence over the end of the if condition)

# Question 3

function foo(d) {
d = d || 5;
console.log(d);
}

foo()

The expression d = d || 5 will default to 5 for any falsy value of d. 

when calling foo without specifying d the value will default to undefined. It would be more useful to specify a default parameter of 5 instead of the or.


This won't work with Typescript as 5 is not a boolean and || can only be used with Boolean values. 

function foo(d=5){
  console.log(d)
}


# Question 4

function foo(a) {
return function(b) {
return a + b;
}
}

const bar = foo(1);

console.log(bar(2))

## Response 4
Javascript allows for partial function calls. 

The function foo is called with parameter a and the return value stored as a closure in the constant bar with the value of a preserved as 1. 

The anonymous function returned by foo is then called by invoking the closure "bar" with the parameter 2 (bar(2))

This returns a+b. a has been fixed at 1 and b is passed as 2 so we get back 3. 

We could also call (for example) bar(3) and the answer would be 4. Anything we pass to bar in this instance will have 1 added to it. 

# Question 5

function double(a, done) {
setTimeout(function() {
done(a * 2);
}, 100);
}


## Response 5

We would first declare a function done - for example a function done to multiply a number by 6

const done = a => a*6;

We can then call the function double with arguments 1 and done (!) as follows :)

double(1,done)

The function will apply done to 1x2 and so we will get 1x2x6 = 12 as our answer. 

The function has no return value so we would need to set one. Here it is console.logged and the function will log 12 after the main execution stack has emptied and 100 milliseconds have passed. 

function double(a, done) {
	setTimeout(function() {
		console.log(done(a * 2));
	}, 100);
  
}

const done = a => a*6;

console.log(done(1))
double(1,done)

(Result: 6,12)