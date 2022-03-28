import Header from'../Components/Header';
import RowView from'./RowView';
import Button from '@mui/material/Button';
import { useState,React,useEffect } from "react";

import Grid from '@mui/material/Grid';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import './DisplayUser.css';
// import Link from '@mui/material/Link'
import{BrowserRouter as Router, Routes,Route,Link,Outlet,} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search';
import {Table,TableHead,TableRow,TableBody} from '@mui/material';

// import React, { Component } from 'react'
import EmployeeService from '../Services/StudentService'










const DisplayUser=(props)=>{

  





// const [data,setData]=useState({});
// const [id,setId]=useState(1);
// useEffect(()=>{
//   fetch(`http://localhost:8080/UserModel/${id}`)
//   .then((response)=>response.json())
//   .then((data) => setData(data)
//   // .then((id) => setId(id))
//         // (emaildata)=>setEmail(emaildata.email)
//   );
// },[]);


const [data,setData]=useState([]);

useEffect(()=>{
  fetch("http://localhost:8080/UserModel")
  .then((response)=>response.json())
  .then((p) => setData(p)
       
  );
},[]);



// const id=data.id;
const [id,setId]=useState(data.id);
const onDelete =async()=>{

  await fetch(`http://localhost:8080/UserModel/${id}`,{
    method:'DELETE'
  })
  .then((res)=>{
    if(res.status!==200){
      return
    }else{
      setData(data.filter((datas)=>{
          return datas.id !== id;
      }))
    }
  })
  .catch((err)=>{
    console.log(err);
  })
}







    return(


<div >

<Header/>


<div className="course-search-and-filter">
      <div className="course-search">
        <input
          className="course-search-input"
          type="text"
          name="course"
          placeholder="Search Course"
        ></input>
        <Button  variant="outlined"  id="searchCourse" className="btn"> Search</Button>
      </div>
      <div className="course-filter">
        <div className='filter1'>Filter By</div>
        
        <Button variant="outlined" className="course-filter-elem"> StudentId</Button>
        <Button variant="outlined" className="course-filter-elem"> Student Name</Button>
        <Button variant="outlined" className="course-filter-elem"> Course</Button>
     
      </div>
    </div>



<table className = " zindex table table-striped table-bordered">

 <thead>
    <tr>
   
        {/* <th value={id} onChnage={e =>setId(e.target.value)}> */}
        {/* {data.map((item)=>{
          return (
          <td key={item.id}>{item.name}</td> */}
          {/* // <td></td>
          // <th key={item.id}>{item.email}</th> */}
          
          {/* );
        })} */}
          {/* StudentID</th> */}
          <th>StudentID</th>
        <th>StudentName</th>
        <th>EnrolledCourse</th>
        <th>mobile no</th>
        <th>Actions</th>
    </tr>
 </thead>
 <tbody>
 {/* {data.map((item)=>{
          return ( */}


{data.map(datas=>(

<tr key={datas.id}>
  <td>{datas.id}</td>
  <td>{datas.name} </td>
  <td>{datas.email}</td>
  <td>{datas.mobileNumber}</td>
  <td>     
        <Link   to="/admin/EditUser" style={{color:"white",textDecoration:"none"}}  target={"_blank"}>
        <button className='zindex' variant="contained" style={{margin:"5px",backgroundColor:"blue",color:"white"}} endIcon={<Edit />} color="primary">Update/View </button>
        </Link>                                   
       
        <button className='zindex' onClick={onDelete(datas.id)} variant="contained" style={{margin:"5px",backgroundColor:"red",color:"white"}} color="error" endIcon={<Delete />}  >Delete</button>                                         
        </td>

  
  </tr>

//  <li></li>
))}

         
      {/* <tr > */}
    {/* { data.map((item)=>(
      <td>{item.name}</td> */}
    {/* ))} */}
     
    


        {/* <td> {data.id} </td>   
        <td>{data.name} </td>
        <td>{data.email} </td>

       

        <td>{data.mobileNumber}</td> */}
       
       

      {/* </tr> */}


  </tbody>
</table>
<div className='btnadd'>
<Link   to="/admin/AddUser" style={{color:"white",textDecoration:"none"}}  target={"_blank"}>
<button 
 className="btn btn-submit"
//  onClick={getemail}
  type="submit"
variant="contained" style={{margin:"5px"}} startIcon={<Add />} color="primary">Add Student </button> 
  </Link>
  </div>
   <Outlet />
</div>       
    );
}
export default DisplayUser;