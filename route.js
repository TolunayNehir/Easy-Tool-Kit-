var express=require('express');
var app = express()
var mysql = require('mysql');
require("dotenv/config");

const router=express.Router();

router.get('/',(req,res)=>{
  res.send("Router:saaaa");
  res.end();
 });

 router.get('/selectall/:key',(req,res)=>{
  key=req.params['key']
  if(key==process.env.key) {
    let tablename=req.query.data;
  let sql = "select * from "+process.env.database+"."+tablename;
  con.query(sql,function (err, result) {
    if (err)  console.log(err);
    res.send(result);
    res.end();
  });
  
  }
  else{
    res.send("You are not authorized");
    res.end();
  }
  
  
 });

 router.get('/selectbyid/:key/:id',(req,res)=>{
  key=req.params['key']
  if(key==process.env.key) {
  let tablename=req.query.table;
  id=req.params['id']
  let sql = "select * from "+process.env.database+"."+tablename+" where id="+id;
  con.query(sql,function (err, result) {
    if (err)  console.log(err);
    res.send(result);
    res.end();
  });
  }
  else{
    res.send("You are not authorized");
    res.end();
  }
 });

 router.get('/selectbytag/:key/:tagname/:tagdata',(req,res)=>{
  key=req.params['key']
  if(key==process.env.key) {
  let tablename=req.query.table;
  tagname=req.params['tagname'];
  tagdata=req.params['tagdata'];
  let sql = "select * from "+process.env.database+"."+tablename+" where "+tagname+"="+tagdata;
  con.query(sql,function (err, result) {
    if (err)  console.log(err);
    res.send(result);
    res.end();
  });
  }
  else{
    res.send("You are not authorized");
    res.end();
  }
 });

var con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password
  });
  con.connect(function(err) {
    console.log("connected to database");
  });
router.get('/router-control',(req,res)=>{
    res.send("This is Easy Tool Kit 1.0 developing by Tolunay Nehir");
    res.end();

});


module.exports = router;
