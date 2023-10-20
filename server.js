// With worker_threads module

const express = require('express');
const app = express();
const {Worker,parentPort,isMainThread} = require('worker_threads')
// configure your env file
const dotenv = require('dotenv');
dotenv.config();



app.get('/', (req,res) => {
    res.json({Msg:"This is home Page"})
})

app.get('/slow-page', (req,res) => {
    //  For big processing I am using big 'for loop' Just as an general example

    // Creating child thread
    const worker = new Worker('./childThreadScript.js');
    //  Determine the worker is created
    worker.on('online', () => {
        console.log("Child thread is created"); 
    })


    // Message getting in main thread 
    worker.on('message', (message)=> {
        if(message.type == "exit"){
            const data = message.data;
            // Here we can check our data also
            res.json({Msg:`Now I am getting message/data after high processing from child thread and message is = ${data}`})
            // Gracefully terminate
            
        }
           
    }) 

    worker.on('exit', (exitCode) => {
        if (exitCode === 0) { 
          console.log('Worker thread has been terminated successfully.');
        } else {
          console.error(`Worker thread terminated with code ${exitCode}.`);
        }
      });
})
 


// Running the server
const Port = process.env.PORT;

app.listen(Port, () => {
    console.log(`Server is running on the port ${Port}`);
})