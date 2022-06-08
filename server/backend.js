const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbconnection =require('./nanodb');
let app = express();
const port = 8000;

 app.use(cors({
 origin: 'http://localhost:4200',
}));
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/getdata/:id',(req,res)=>{
  console.log("username",req.params.id);

  let objectnew = {
    selector:{
      "username":req.params.id,
      "type":"user"
    }
  }
  dbconnection.testdb.find(objectnew).then((data)=>{
    console.log("data Fetch from db", data);
    res.send(data);
  })
  .catch((err=>{
    console.log("error",err);
  }))
})

app.post('/postdata',(req,res)=> {
  
let objectnew = {
  fullname:req.body.fullname,
  username:req.body.username,
  email:req.body.email,
  Password:req.body.Password,
  confirmPassword:req.body.confirmPassword,
  type:"user"
}
  console.log("data from angular",objectnew);
  dbconnection.testdb.insert(objectnew).then((data)=>{
  console.log("data inserted successfully ",data);
  if(data){
    res.status(200).send({
      message:"successfully generated"
    })
  }
}).catch((err)=>{
console.log("Error from server",err);
res.send("Server Down Can't fetch Details");
})
})

app.post("/postdata1", function (req, res) {
  let objectnew1 = {
    userid: req.body.userid,
    pwd: req.body.pwd,
  };
  const fetchData ={
    "selector" :{
      userid :objectnew1.userid,
      pwd :objectnew1.pwd,
      type:"user"
    }
  }
  console.log(fetchData)
  dbconnection.admin.find(fetchData).then((data) => {
   res.send(data);
  });
});

app.listen(port, (err) => {
if (err) {
    return console.log('something bad happened', err);
   }

  console.log(`server is listening on http://localhost:${port}`);
 });
