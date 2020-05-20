const express= require('express');
const http= require('http');
const morgan = require('morgan');
const bodyParser= require('body-parser');

const dishRouter=require('./routes/dishRouter');
const promoRouter=require('./routes/promoRouter');
const leaderRouter=require('./routes/leaderRouter');
const hostname='localhost';
const port=3000;

//telling application that we are using express module
const app=express(); //telling application that we are using express module
app.use(morgan('dev'));
app.use(bodyParser.json());



app.use('/dishes',dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

app.use(express.static(__dirname+'/public'))

//next(optional) is used to invoke additional middleware 
app.use((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is Express Server</h1></body></html>');
});


const server= http.createServer(app);
server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`)
});