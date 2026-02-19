const express = require('express');
const app = express();
const port = 5630;

app.get('/', (req,res)=>{
    res.send("Hello World");
})



app.listen(port, ()=>{
    console.log(`app is currently runing on port ${port}`);
    
})