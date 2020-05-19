const express= require('express');
const http= require('http');

const hostname='localhost';
const port=3000;

//telling application that we are using express module
const app=express();

//next(optional) is used to invoke additional middleware 
app.use((req,res,next)=>{
    console.log(req.headers);
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is Express Server</h1></body></html>');
});


const server= http.createServer(app);
server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`)
});