const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser = require('body-parser');

const {createProxyMiddleware}=require('http-proxy-middleware')

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.set('strictQuery',false);
mongoose.Promise=global.Promise;

const db=require('../backend/config/db.config');
const bookRoute = require('../backend/routes/book.route');
const req = require('express/lib/request');
const res = require('express/lib/response');
// const  json  = require('body-parser');


mongoose.connect(db.url,
    {
        useNewUrlParser:true, useUnifiedTopology:true
    }).then(()=>
    {
        console.log('successfully connected to database...');
    }).catch((err=>
        {
            console.log('could not connect to database..',err);
            process.exit();
        }));


        app.use(function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        
            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        
            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);
        
            // Pass to next layer of middleware
            next();
        });


        app.get('/',(req,res)=>
        {
            res.json({"message":"welcome to book store"})
        })


    require('../backend/routes/book.route')(app);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded(
        {
            extended:false
        }
    ));


    app.use(cors());
    // create static path 
    app.use(express.static(path.join(__dirname,'dist/BookStore')))
    
    //api root
    app.use('/api',bookRoute);
    const port=process.env.port || 5000;

app.listen(port,()=>
{
    console.log('server is listening on port ' + port);
    
})

//404 error handler
app.use((req,res,next)=>
{
    next(createError(404));
});

// base route 
app.get('/',createProxyMiddleware({target:'*',changeOrigin:true}),(req,res)=>{
    res.send('invalid endpoint');
});

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/Bookstore/index.html'));
});

app.use(function(err,req,res,next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode ==500;
    res.status(err.statusCode).send(err.message);
});

