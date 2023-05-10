### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
With Callbacks, Promises, and Async/Await keywords.

- What is a Promise?
A promise is a guarantee  of a future valu, an object that needs to be resolved/called using things like .then or better axios.

- What are the differences between an async function and a regular function?
Async functions allow JavaScript to automatically return a promise, which allows the use of await.

- What is the difference between Node.js and Express.js?
Node is kind of like the base that allows for JavaScript based writing to work in a back end environment. Where as Express is an actual framework that works with Node.

- What is the error-first callback pattern?
A pattern where a function either returns an error object or any successful data returned by the function.

- What is middleware?
Middleware is functionality that is allowed to execute in between request/response cycles. 

- What does the `next` function do?
In the request/response cycle, if whatever request or middleware function being executed does not stop the cycle, move on to the next thing. 

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
Each of these variables are having their request made one after another, I think one thing that would help is doing something like Promise.all() to make all of these requests happen at the same time and non-sequentially.