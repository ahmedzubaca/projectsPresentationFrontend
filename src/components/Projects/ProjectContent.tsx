import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import projectContentCss from "./Projects.module.css";
import axios from "axios";
import { DataToRender } from '../../utilities/data-to-render';
import useMountedState from '../../utilities/use-mounted-state';

interface IProjects {
  category: string,
  content: string
};

const Projectontent = () => {

  const[imgData, setImgData] = useState<DataToRender[]>([]);  
  const {category, content} = useParams<IProjects>();
  const history = useHistory();
  const isMounted = useMountedState();  
  
  const fetchImgData = async () => {
    await axios.get(`http://localhost:49808/api/Projects/${category}/${content}`)    
    .then(response => {
      if(isMounted()) {
        setImgData(response.data);
      }           
    })      
  };

  useEffect(() => {
    fetchImgData();    
  }, []) // eslint-disable-line react-hooks/exhaustive-deps 
  
  const handleContentImgClick = (data: string | undefined) => {
    if(data) {       
        const imgTitle = data.replace(' ', '-');        
        history.push(`/projects/${category}/${content}/${imgTitle}`);       
    }    
  } 

  return(   
    <div className={projectContentCss["projects"]}>     
      {
        imgData.map((image) => {
          return( 
            <div  key={image.id} className={projectContentCss["img-and-title-container"]}>                            
              <img className={projectContentCss["img-style"]} 
                  alt="Project Content" 
                  src={`${image.url}`} 
                  onClick={() => handleContentImgClick(image.imageTitle)}                                                                                               
              />
              <div className={projectContentCss["img-title"]}> {image.imageTitle} </div>
            </div>
          )
        })          
      }    
    </div>   
  )
}

export default Projectontent;