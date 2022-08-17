const mongoose=require("mongoose")
const employeeSchema=mongoose.Schema({
    uniqueId:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:false
    },
    city:{
        type:String,
        required:false
    },
    salary:{
        type:String,
        required:false
    },
    dateOfJoining:{
        type:String,
        required:false
    },
})
EmployeeDataSchema=mongoose.model("EmployeeDataSchema",employeeSchema)
module.exports={
    EmployeeDataSchema 
}