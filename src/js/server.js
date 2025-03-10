import express from 'express';

// =>Express server setup 

const exapp = express();

exapp.use(express.static('dist'));

//start the Express server 

exapp.listen(8000,()=>{
    console.log('server is running on http://localhost:8000');
});