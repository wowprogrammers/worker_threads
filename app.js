// Without worker_threads module

const express = require('express');
const app = express();
// configure your env file
const dotenv = require('dotenv');
dotenv.config();


app.get('/', (req,res) => {
    res.json({Msg:"This is home Page"})
})

app.get('/slow-page', (req,res) => {
    //  For big processing I am using big 'for loop' Just as an general example
    let j = 0;
    for(let i = 0;i< 4000000000;i++) {j++} 

    res.json({Msg:`This response is coming after very high processing ${j}`});
})



// Running the server
const Port = process.env.PORT;

app.listen(Port, () => {
    console.log(`Server is running on the port ${Port}`);
})