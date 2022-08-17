import logo from './logo.svg';
import './App.css';
import axios from "axios"
import { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { v4 as uuidv4 } from 'uuid';
import moment from "moment"
function App() {
  const [name,setName]=useState("")
  const [city,setCity]=useState("")
  const [cityData,setCityData]=useState()
  const [salary,setSalary]=useState(null)
  const [date,setDate]=useState(moment(new Date()).format("YYYY-MM-DD"))
  const [uniqueId,setUniqueId]=useState(uuidv4())
  const toast=useRef(null)
  const showSuccess = (message) => {
    toast.current.show({severity:'success', summary: 'Success Message', detail:message, life: 3000});
  }
   const showError = (message) => {
    toast.current.show({severity:'error', summary: 'Error Message', detail:message, life: 3000});
  }
  const submitCity=async (e)=>{
    e.preventDefault()
    if(cityData?.length>1){
      const data={
        uniqueId:uniqueId,
        city:cityData
      }
      try {
        const res=await axios.post("http://localhost:5000/employeeData",data)
      if(res.status==200){
        showSuccess("city data send successfully")
        setCityData("")
        setUniqueId(uuidv4())
      }
      } catch (error) {
        showError(error.response.data.message)
        setUniqueId(uuidv4())
        setCityData("")
      }
      
    }else{
      showError("Enter All Required Field")
    }
  }
  const submitBtn=async (e)=>{
    e.preventDefault()
    const data={
      name: name,
      uniqueId: uniqueId,
      city: city,
      salary: salary,
      dateOfJoining: date
  }
  if(name.length>0 && city.length>0 && salary>0 && date !=="" && date !==null){
    try {
      const res=await axios.post("http://localhost:5000/employeeData",data)
      if(res){
         showSuccess(res.data.message) 
         setName("")
         setCity("")
         setSalary("")
         setDate(moment(new Date()).format("YYYY-MM-DD"))
         setUniqueId(uuidv4())
      }
    } catch (error) {
      showError(error.response.data.message)
      setName("")
      setCity("")
      setSalary("")
      setDate(moment(new Date()).format("YYYY-MM-DD"))
      setUniqueId(uuidv4())
    }
  }else{
    showError("Enter All Required Field")
  }
  }
  return (
    <div className="App">
    <Toast ref={toast} />
      <div className='app-data'>
      <div className="row">
        <h3>Employee Data</h3>
        <div className="col-6 d-flex justify-content-between my-3">
        <label className="left-container">
          Unique Id
        </label>
        <input type="text" value={uniqueId} className="right-container unique-id" disabled/>
        </div>
        <div className="col-6  d-flex justify-content-between my-3">
        <label className="left-container">
          Name
        </label>
        <input type="text" className="right-container"  value={name} onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className="col-6 d-flex justify-content-between my-3">
        <label className="left-container">
          City
        </label>
        <input type="text" className="right-container" value={city} onChange={(e)=>setCity(e.target.value)}/>
        </div>
        <div className="col-6 d-flex justify-content-between my-3">
        <label className="left-container">
        Salary
        </label>
        <input type="number" className="right-container" value={salary} onChange={(e)=>{setSalary(e.target.value)}}/>
        </div>
        <div className="col-6 d-flex justify-content-between my-3">
        <label className="left-container">
          Date Of Joining
        </label>
        <input value={date} type="date" onChange={(e)=>setDate(e.target.value)} className="right-container"/>
        </div>
        <div className="col-6 d-flex justify-content-end my-3">
          <button onClick={submitBtn} style={{width:"68%",backgroundColor:"black",color:"white",borderRadius:"7px"}}>submit</button>
        </div>
        </div>
        <div className='row my-5'>
          <h3>City Name:-</h3>
        <div className="col-6 d-flex justify-content-between my-3">
        <label className="left-container ">
          Unique Id
        </label>
        <input type="text" className="right-container unique-id" disabled value={uniqueId}/>
        </div>
        <div className="col-6 d-flex justify-content-between my-3">
        <label className="left-container">
          City Name
        </label>
        <input type="text" className="right-container" value={cityData} onChange={(e)=>setCityData(e.target.value)} />
        </div>
        <div className='col-6'></div>
        <div className="col-6 d-flex justify-content-end my-3">
          <button onClick={submitCity} style={{width:"68%",backgroundColor:"black",color:"white",borderRadius:"7px"}}>submit</button>
        </div>
        {/* <div className="col-6 d-flex justify-content-between my-3">
        <label className="left-container">
          UniqueId
        </label>
        <input type="text" className="right-container"/>
        </div>
        <div className="col-6 d-flex justify-content-between my-3">
        <label className="left-container">
          Unique Id
        </label>
        <input type="text" className="right-container"/>
        </div>
        <div className="col-6 d-flex justify-content-between my-3">
        <label className="left-container">
          UniqueId
        </label>
        <input type="text" className="right-container"/>
        </div> */}
      </div>
      </div>
    </div>
  );
}

export default App;
