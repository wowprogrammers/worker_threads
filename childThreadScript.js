  
    // This is child thread   
    const {parentPort} = require('worker_threads')
    let j = 0
    for(let i = 0;i< 4000000000;i++) {j++} 
    // Message passing from child thread
    parentPort.postMessage({type:"exit",data:j}); 
    