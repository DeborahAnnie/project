const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbconnection =require('./nanodb');
const app = express();
app.disable("x-powered-by");
let helmet = require("helmet");
app.use(helmet.hidePoweredBy());

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
  console.log("********");
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
  let data1;
    
  if(data){
    data1 ={
      message: 'Registered Successfully',
      status: "success",
      response: data
    }
  }
  res.send(data1);
}).catch((err)=>{
res.status(400).send({
  message: 'failed to register',
  status: "error",
  err: err
});
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
  })
  .catch((err=>{
    console.log("error",err);
  }))
});

app.listen(port, (err) => {
if (err) {
    return console.log('something bad happened', err);
   }

  console.log(`server is listening on http://localhost:${port}`);
 });
