import React, { useState } from 'react'
import vector from "../../Assets/Images/Vector.png"
import PTRLogo from "../../Assets/Images/PTRLogo.png"
import { Box,Button, Container, FormField, Input, SpaceBetween,Link,Header } from '@cloudscape-design/components'
import { useNavigate } from 'react-router-dom'
const OtpVerification = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState(new Array(6).fill(""));

    const handleChange = (element, index) => {
      if (isNaN(element.value)) return;
  
      setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
  
      // Move focus to the next input box
      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    };
  
    const handleVerify = () => {
      // Implement verify logic
      console.log("OTP entered:", otp.join(""));
      navigate("/auth/CreateNewPassword")
    };
  
    return (
        <div className='login_page'>
        <img src={PTRLogo} alt="" />
        <img className='login_page_vector' src={vector} alt="" />
      <Container>
        <Header variant="h1" className="otp-header">Enter Your OTP</Header>
        <p className="otp-subtext">
          Enter the <span className="highlight">six-digit code</span> sent to you to reset your password
        </p>
        
        <SpaceBetween size="m" direction="vertical">
          <div className="otp-inputs">
            {otp.map((data, index) => (
              <input
                className="otp-input"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={e => handleChange(e.target, index)}
                onFocus={e => e.target.select()}
              />
            ))}
          </div>
    

        
                  
          <Button  variant='primary' onClick={handleVerify} fullWidth>Verify</Button>
            <Button variant='link' fullWidth onClick={() => navigate("/auth/signin")}>Cancel</Button>
        </SpaceBetween>
      </Container>
          </div>
  )
}

export default OtpVerification