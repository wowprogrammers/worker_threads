
# Node.js Interview Question

# worker_threads

## @wowprogrammers

  
  
  

#### How Node.js Handle its Child Threads?

Traditionally, when we think about what Node.js is, we often learn that it's a **single-threaded**, event-driven JavaScript runtime environment. In this model, there's a **solitary** main thread, commonly referred to as the event loop, responsible for processing all incoming requests and events and executing JavaScript code.

  

However, Node.js introduced a module called "worker_threads" as an experimental feature in version **10.5.0**, which later became a stable part of Node.js starting from version **12.0.0**.

  

So, what exactly is the "worker_threads" module?

  

Let's delve into it.

  

With the "worker_threads" module, **Node.js** supports handling **child threads**. This module enables you to create and manage multiple threads (also known as workers) that can run JavaScript code in parallel. This is particularly valuable for offloading CPU-intensive tasks such as **image or video processing**, **compression** and **decompression**, and **file system** operations. It keeps the main event loop free to handle I/O operations and promptly respond to user requests.

  

"worker_threads" module allow you to run JavaScript code in separate threads, parallel to the main application thread. Both threads execute parallel. To illustrate, let's consider an example.

  

Imagine you've created your Node.js server without using the "worker_threads" module. After setting up your Node.js server, you've added an API endpoint "/heavy task" that performs time-consuming operations like image processing. Now, User **A** accesses this API endpoint "/heavy task." At that very moment, if User **B** requests a different response, your server won't be able to handle User **B's** request until it finishes processing User **A's** request.

  

This means your server can't handle multiple requests simultaneously.

  

To address this issue, you can use the popular Node.js module "worker_threads" to create child threads. This helps prevent the event loop from being blocked.

  

### Creating the Worker Thread

  

Let's explore how Node.js handles and creates child threads using the "worker_threads" module, step by step.

  

### Step 1: Importing the "worker_threads" module:

```
const { Worker, isMainThread, parentPort } = require('worker_threads');
```

### Step 2: Detecting the Main Thread

  

Within your JavaScript code, you can determine whether your current script is running inside the main thread or a child thread using the "isMainThread" property.

```
if (isMainThread) {

	// Code for the main thread goes here

} else {

	// Code for the child thread goes here

}
```

### Step 3: Creating and Running a Child Thread

  
To create and start a child thread, use the "Worker" class. Provide the path to the JavaScript file that should be executed in the child thread.

```
const worker = new Worker('./path/to/child/thread/script.js');
```

### Step 4: Passing Data Between Threads

  

A crucial aspect is that child threads can communicate with the main thread and vice versa using a **message passing system**. You can send and receive messages using the "parentPort" property in the child thread and the "postMessage" method in the main thread.

  

**Main thread**

```
const worker = new Worker('./path/to/child/thread/script.js');

worker.postMessage("Sending Message from the main thread");
```

**Child thread**

```

parentPort.on('message', (message) => {

console.log(`Message received from the main thread in the child thread: ${message}`);
});
```

In the example above, we send a message from the **main** thread to the **child** thread. But what if we want to send a message from the child thread to the main thread? That's straightforward too.

  

**Main thread**

```
const worker = new Worker('./path/to/child/thread/script.js');

worker.on('message', (message) => {

console.log(`Message received from the child thread in the main thread: ${message}`);
});
```

**Child thread**

  

```
const {parentPort} = require('worker_threads');
parentPort.postMessage("Write your message or data here that you want to send");
```

### Step 5: Terminating a Child Thread

  

You can terminate a child thread using the `worker.terminate()` method in the main thread.

```
worker.terminate();
```

**Important Point**

  

It's important to note that child threads in Node.js share the same event loop as the main thread. While they are useful for offloading CPU-intensive tasks, they do not provide true multi-core parallelism. Each child thread runs in a separate JavaScript environment but shares the same event loop, which can lead to potential blocking if not managed carefully.