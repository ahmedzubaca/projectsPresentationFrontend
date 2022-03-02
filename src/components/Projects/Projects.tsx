import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { DataToRender} from '../../utilities/data-to-render';
import projectsCss from "./Projects.module.css";
import axios from "axios";
import useMountedState  from "../../utilities/use-mounted-state";

interface IProjects {
  category: string
};

const AllProjects = () => {

  const[imgData, setImgData] = useState<DataToRender[]>([]);  
  const {category} = useParams<IProjects>();
  const history = useHistory();
  const isMounted = useMountedState();  
  
  const fetchImgData = async () => {
    await axios.get(`http://localhost:49808/api/Projects/${category}`)
    .then(response => { 
      if(isMounted()) {
        setImgData(response.data);
      }                      
    });
  }   

  useEffect(() => {
    fetchImgData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps 
  
  const handleProjectCoverImgClick = (data: string | undefined) => {
    if(data) {
      const projecTitle = data.replace(' ', '-')
      history.push(`/projects/${category}/${projecTitle}`)
    }    
  } 

  return(    
    <div className="projects">     
      {
        imgData.map((image) => {
          return( 
            <div  key={image.id} className={projectsCss["img-and-title-container"]}>              
              <img className={projectsCss["img-style"]} 
                  alt="Project Content" 
                  src={`${image.url}`} 
                  onClick={() => handleProjectCoverImgClick(image.projectTitle) }                                                                                               
              />
              <div className={projectsCss["img-title"]}> {image.projectTitle} </div>
            </div>
          )
        })          
      }     
    </div>    
  )
}
export default AllProjects;