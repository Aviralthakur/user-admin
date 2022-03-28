import React, { Component } from 'react';

import Button from '@mui/material/Button';
import "./ViewCourse.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Header from'../Components/Header';
import {Link,Outlet,} from  "react-router-dom";
import CourseSearchFilter from '../Components/CourseSearchFilter';




function ViewCourse(props) {
  return (
    <div>

<Header/>

    <CourseSearchFilter />

                
               
          






  <div className="card" style={{width:"30%"}}>
  
  <div className="container">
    





  <Grid container  className="rowgrid"  item xs={12} sm={4} md={12}>
                  <Grid  className="gridelement" >
                  <p>courseId :</p>
                  </Grid>
                  <Grid  className="gridelement">
                  <p>Course Name :</p>
                  </Grid>
                  <Grid   className="gridelement">
                  <p>Duration :</p>
                  </Grid>
                 
               </Grid>

               <Grid container className="rowgrid"  item xs={12} sm={4} md={12}>
                  <Grid  className="gridelement">
                 <p>Students Enrolled:</p>
                  </Grid>
                  <Grid className="gridelement" >
                  <p  >Course Year:</p>
                  </Grid>
                  <Grid className="gridelement">
                  <p>Type:</p>
                  </Grid>
                 
               </Grid>

               <Grid container className="rowgrid"  item xs={12} sm={4} md={12}>
                  <Grid  className="gridelement" >
                 <p>Institute Name:</p>
                  </Grid>
                  </Grid>
                 
                   
                <div>
                <Grid container className="btngrid zindex"  item xs={12} sm={4} md={12}>
               
                  <Grid className="btngrid">
                  <Link to="/admin/EditCourses" style={{color:"white",textDecoration:"none"}}  target={"_blank"}>
                  <Button  variant="outlined" style={{margin:"5px"}} id="addCourse" startIcon={<Edit />} color="primary">Edit </Button> 
                 </Link>

                  
                  </Grid>
                  <Grid className="btngrid">

                  <Link to="/admin/DeleteCourses" style={{color:"white",textDecoration:"none"}}  target={"_blank"}>
                  <Button  variant="outlined" style={{margin:"5px"}} id="addCourse" startIcon={<Delete />} color="error">Delete</Button> 
                 </Link>
                  
                  </Grid>  
                  </Grid> 
                </div>
        </div>
   

    
  </div>
  
  <div>
 
  </div>
  <Outlet/>
</div>


             
  );
}

export default ViewCourse;

