var express = require("express");
var app = express();


const router=require("./route")


app.get('/',(req,res)=>{
    res.send("Running...");
   });


app.use("/posts",router);





app.listen(3000);