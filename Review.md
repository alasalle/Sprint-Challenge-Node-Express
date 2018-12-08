# Review Questions

## What is Node.js?

- Node.js is a asynchronous event driven runtime environment that allows developers to write Javascript outside of the browser; with Node, server side code can be written in Javascript.

## What is Express?

- Express is a lightweight and unopinionated framework or module for Node that simplifies the creation of web apps and services in Node.

## Mention two parts of Express that you learned about this week.

- The two main parts of Express that we learned about this week are Middleware and Routing.

## What is Middleware?

- Middleware - in the context of Express - are functions that receive req and res, perform some operation on them, and then return a response or call the next piece of middleware.

## What is a Resource?

- A resource is anything that’s important enough to be referenced as a thing in itself. If the user might want to perform some operation on some data, then that data is a resource. A resource is an object with a type, associated data, relationships to other resources, and a set of methods that operate on it (i.e. GET, POST, PUT, or DELETE). 

## What can the API return to help clients know if a request was successful?

- The API can return a status code. Status codes are used based on the type of error or success, so that can provide more information to the client.

## How can we partition our application into sub-applications?

- Express Routers can be used to break an application up for ease of use. Routers act like mini applications with their own routing and middleware.

## What is express.json() and why do we need it?

- express.json() is built-in middleware that can be used to parse JSON content out of a request body. It tells the server to accept the incoming data as a JSON object (because that's compatible).
