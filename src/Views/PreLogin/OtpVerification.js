import React, { useState } from 'react'
import vector from "../../Assets/Images/Vector.png"
import PTRLogo from "../../Assets/Images/PTRLogo.png"
import { Box,Button, Container, FormField, Input, SpaceBetween,Link,Header, Flashbar } from '@cloudscape-design/components'
import { useNavigate } from 'react-router-dom'
import { preLoginService } from "../../Services";
import config from "../Config";
const OtpVerification = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (element, index) => {
      if (isNaN(element.value)) return;
  
      setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
  
      // Move focus to the next input box
      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    };
  
    const handleVerify = async () => {
      setLoading(true);
      const OTP = otp.join("");
      const emailVal = localStorage.getItem("email");
      const parsedEmail = JSON.parse(emailVal);
      try {
        const response = await preLoginService.post(config.VERIFY_OTP, {
          email: parsedEmail,
          otp: OTP,
        });
        setItems([
          {
            type: "success",
            content: "OTP verified successfully!",
            dismissible: true,
            dismissLabel: "Dismiss message",
            onDismiss: () => setItems([]),
            id: "message_1",
          },
        ]);
        setTimeout(() => {
          navigate("/auth/CreateNewPassword", { state: { OTP } });
        }, 1000);
      } catch (error) {
        setItems([
          {
            type: "error",
            content: `OTP verification failed: ${error?.response?.data?.message || error.message}`,
            dismissible: true,
            dismissLabel: "Dismiss message",
            onDismiss: () => setItems([]),
            id: "message_2",
          },
        ]);
      } finally {
        setLoading(false);
      }
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
    

        
                  
          <Button  variant='primary' onClick={handleVerify} fullWidth disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </Button>
            <Button variant='link' fullWidth onClick={() => navigate("/auth/signin")}>Cancel</Button>
        </SpaceBetween>
        <Flashbar items={items} />
      </Container>
          </div>
  )
}

export default OtpVerification