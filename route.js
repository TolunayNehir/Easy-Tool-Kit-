var express=require('express');
var app = express()
var mysql = require('mysql');
require("dotenv/config");

const router=express.Router();

router.get('/',(req,res)=>{
  res.send("Router:Hello");
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

 router.get('/selectdistinct/:key/:tagname',(req,res)=>{
  key=req.params['key']
  if(key==process.env.key) {
  tag=req.params['tagname']
  let tablename=req.query.table;
  let sql = "select distinct "+tag+" from "+process.env.database+"."+tablename;
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

 router.get('/insert/:key/:datas/:values',(req,res)=>{
  key=req.params['key']
  if(key==process.env.key) {
  values=req.params['values']
  datas=req.params['datas']
  arr=values.split("*");
  arr2=datas.split("*");
  let str;
  let str2;
  var i1=arr.length;
  console.log(i1);
  var i2=arr2.length;
  console.log(arr);
  let tablename=req.query.table;
  arr2.forEach(element=>{
      if(i2!=1){
         str2+=element+","
      }
      else{
        str2+=element
      }
    i2--;
  });
  arr.forEach(element => {
    if(parseInt(element)/1==parseInt(element)){
      if(i1!=1){
         str+=element+","
      }
      else{
        str+=element
      }
    }
    else{
      if(i1!=1){
        str+="'"+element+"',"
     }
     else{
       str+=element
     }
    }
    i1--;
  });
  let sql = "INSERT INTO "+process.env.database+"."+tablename+" ( "+str2+") VALUES ( "+str+");";
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

 router.get('/deletebyid/:key/:id',(req,res)=>{
  key=req.params['key']
  if(key==process.env.key) {
    id=req.params['id']
    let tablename=req.query.table;
  let sql = "delete from "+process.env.database+"."+tablename+" where id="+id;
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


router.get('/deletebytag/:key/:tag/:data',(req,res)=>{
    key=req.params['key']
    if(key==process.env.key) {
      tag=req.params['tag']
      data=req.params['data']
      let tablename=req.query.table;
    let sql = "delete from "+process.env.database+"."+tablename+" where "+tag+"="+data;
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
