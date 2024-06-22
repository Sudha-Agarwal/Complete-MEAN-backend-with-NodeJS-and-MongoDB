const express = require('express');

const app=express();

const router = express.Router();

//application level 
router.use((req,res,next)=>{
   next();
});

router.get('/user/"id',(req,res)=>{

})

modules.exports = router;

/* In main server.js */

const route = require('./routerLevel');

app.use('/', route);
