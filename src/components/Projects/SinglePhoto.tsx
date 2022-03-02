import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useMountedState from '../../utilities/use-mounted-state';
import imageStyle from "./SinglePhoto.module.css";

interface IProjectsInfo {
  category: string;
  content: string;
  imgTitle: string
};

const SinglePhoto = () => {

  const[imgUrl, setImgUrl] = useState('');  
  const {category, content, imgTitle} = useParams<IProjectsInfo>();
  const isMounted = useMountedState(); 

  const fetchImgData = async () => {
    const response : any = await axios.get(`http://localhost:49808/api/Projects/${category}/${content}/${imgTitle}`);    
   
      if(isMounted()) {
        setImgUrl(response.data[0].url);
      }                 
            
  };  

  useEffect(() => {
    fetchImgData();    
  }, []) // eslint-disable-line react-hooks/exhaustive-deps 
  
  return (   
    <div className={imageStyle['image-container']}>            
        <img className={imageStyle['image-style']} alt="Project Part" src={`${imgUrl}`}/>
        <div className='img-title'> {imgTitle} </div>
    </div>  
  )
}
export default SinglePhoto;