import React, { Component } from 'react';
import './App.css';
import Course from './Course';
import axios from 'axios';


class App extends Component {
  constructor()
  {
    super()
    this.state={
      Course:[]
        

      
    }
  }
  componentDidMount()
  {
    fetch('http://localhost:5000/courses')
            .then(response=>response.json())
            .then(data=>this.setState({
              Course:data
            }))
     
  
  }
  render()
 
  {
    const Courses=this.state.Course.map(course=>
      {
        return <Course key={course._id} Name={course.name} Volume={course.volume} Length={course.length}  Date={course.date} Tags={course.tags} picture={course.picture} />
      })



    
  
  return(
    <div>
       {Courses}
    </div>

  )
  }
  }    
export default App;