import React, { useRef, useState } from 'react';
import axios from 'axios';
import contactCss from './Contact.module.css';

const Contact = () => {

  const initUserInfo = { 
    firstName: '',   
    lastName: '',
    email: '',
    message: ''
  }
    
  const [userInfo, setUserInfo] = useState(initUserInfo);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');   
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);  
  const alertText = () =>  setTimeout(()=> setIsVisible(false), 3000);
  
  const clearUserInfo = () => {
    if(formRef.current !== null) {
      formRef.current.reset()
    }    
  }

  const handleUserInfo = () => {
    if(firstNameRef.current !== null && lastNameRef.current !== null
       && emailRef.current !== null && messageRef.current !== null) {
        setUserInfo({
          ...userInfo,  firstName: firstNameRef.current.value,
                        lastName: lastNameRef.current.value,
                        email: emailRef.current.value,
                        message: messageRef.current.value
        })
    }   
  }  
  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();         
   
    const {firstName, lastName, email, message} = userInfo;

    if(firstName !== '' && lastName !== '' && email !== '' && message !== '') {          
     
      await axios.post('http://localhost:49808/api/Mailer/contactform', {
        ...userInfo    
      })      
      .then((response) => { 
        setIsVisible(true);      
        if( response.status === 200 ) {          
          setMessage('Message sent');
          clearUserInfo();
          alertText();       
        }
        else if(response.status !== 200) {
          
          setMessage('Sending message failed');
          clearUserInfo();
          alertText();
        }                
      });      
    } else {
      setIsVisible(true);
      setMessage('Please, fill all fields!')
      alertText();
    }
  }

  return(    
    <div className={contactCss['overall-container']}>
      <div className={contactCss['contact-info-container']}>        
        <div className={contactCss['address-heading']}>Address:</div>
        <div className={contactCss['address-data']}>
          Grbavička 103 <br/>
          71000 Sarajevo <br/>
          Bosnia and Herzegovina
        </div>         
        <div className={contactCss['phone-heading']}>Phone:</div>
        <div className={contactCss['phone-data']}>+387 62 123 4567</div>          
        <div className={contactCss['email-heading']}>Email:</div>
        <div className={contactCss['email-data']}>merjema.zubaca@gmail.com</div>        
      </div>       
      <form className={contactCss['sending-message-container']}
            ref={formRef} 
            method='POST'
            onSubmit={handleSubmit}
      >
        <div className={contactCss['sending-message-note']}> Send us message </div>
        <div className={contactCss['user-info-container']}>
          <div> First Name: </div>
          <input type='text' id='fname' 
                  placeholder='Enter Your name'                   
                  ref={firstNameRef}                                 
          /><br/>
          <div> Last Name: </div>
          <input type='text' id='lname' 
                name='lastName' placeholder='Enter Your last name'                  
                ref={lastNameRef} 
          /><br/>
          <div>Email:</div>
          <input type='email' id='email' 
                name='email' placeholder='Enter Yuor email'                   
                ref={emailRef}
          /><br/>
        </div>
        <textarea className={contactCss['text-container']}
                  name='message' 
                  id='message'
                  placeholder='Write Your message'                    
                  ref={messageRef}
        >
        </textarea>
        <button className={contactCss['submit-button']} 
                type='submit'
                onClick={handleUserInfo}
        >
                  Submit
        </button>
      </form>
      {
        isVisible ? <div className={contactCss['alert-message-div']}> {message} </div> : null
      }
    </div>    
  )
}
export default Contact;