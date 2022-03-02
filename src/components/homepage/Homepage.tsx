import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useTransition, animated} from 'react-spring';
import useMountedState from '../../utilities/use-mounted-state';

const Homepage = () => { 

  const [slides, setSlides] = useState<string[]>()
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const playRef = useRef<any>(null);
  const isMounted = useMountedState();  

  const fetchImgData = async () => {
    
    await axios.get('http://localhost:49808/api/Projects/home')
    .then(response => {
      if(isMounted()) {
        setSlides(response.data);
      }                       
    });
  }

  useEffect(() => {
    playRef.current = nextSlide;    
  }); 

  useEffect(() => {
    fetchImgData();
    const play = setInterval(() => {      
      playRef.current();      
    }, 5000);
    
    return () => {
      clearInterval(play);
    }    
  }, []); // eslint-disable-line react-hooks/exhaustive-deps 

  const nextSlide = () => {     
      setSlideIndex((prevIndex) => slides && prevIndex === slides.length - 1
       ? 0 : prevIndex + 1)      
  }
  
  const transitions = useTransition(slideIndex, {    
    from: {opacity: 0.7},
    enter : {opacity: 1},
    leave: {opacity: 0},
    config: {duration: 600}
  }); 
   
  return( 
    <>
      {
        slides ?
        transitions((style, index)  => (
          <animated.div
            style = {{
              ...style,
              position: 'absolute',
              width: '100vw',
              height: '100vh',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              top: 0,
              left: 0,
              zIndex: -1,
              backgroundImage: `url(${slides[index]})`
            }}         
          /> 
        ))
        : 'Loading images'
      } 
    </>
  );  
}
export default Homepage;