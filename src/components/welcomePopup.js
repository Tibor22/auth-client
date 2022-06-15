
import { useState } from 'react'
import './welcomePopup.css'
export default function WelcomePopup({text,name}) {

    // const welcomeText = text

    const [popup,setPopup] = useState(true)

    function closePopup() {
       setPopup(false)
    }
    console.log(name)
    return (
        <>
        <div className={`welcome-popup ${popup ? '': 'hidden'}`}>
            <div className={`center-popup ${popup ? '': 'hidden'}`}>
                <div onClick={(e) => closePopup()} className="close">X</div>
            <h1>Welcome {name}! </h1>
            <p>{text}</p>
            </div>
          
        </div> 
        </>
    )
}

