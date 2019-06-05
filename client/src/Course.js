import React from 'react';
import './Course.css'



const Course=(props)=>

{
    return(
        <div className="Course">
                <p>Name:{props.Name}</p>
                <p>Volume:{props.Volume}</p>
                <p>Length:{props.Length}</p>
                <a href="http://www.varzesh3.com"><img src={props.picture}></img></a>
                <p>Date:{props.Date}</p>
                <video width="300" height="250" controls >
                <source src="https://www.youtube.com/watch?v=r3ebOxltJ1w" type="video/mp4"/>
                    </video>
                <p>Tags:{props.Tags}</p>

            
              
    </div>
    )

}
export default Course