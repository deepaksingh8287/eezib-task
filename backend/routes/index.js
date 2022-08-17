var express = require('express');
var router = express.Router();
const mongoose=require("mongoose")
const {EmployeeDataSchema}=require("../modal/employeeDataSchema")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node' });
});
router.post("/employeeData",async function(req,res,next){
  const employee=new EmployeeDataSchema(req.body)
  try {
    const data=await employee.save()
    if(data){
      res.send({
        data:employee,
        status:200,
        message:"Employee Data Send Successfully"
      })
    }  
  } catch (error) {
    if(error.code==11000){
    res.status(500).send({message:"Do not Entered Duplicate Value in UniqueId"})
    }else{
    res.status(401).send({message:"Data Cannot Send Successfully"})
    }
  }  
})

module.exports = router;
