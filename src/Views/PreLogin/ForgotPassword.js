import React, { useState } from 'react'
import vector from "../../Assets/Images/Vector.png"
import PTRLogo from "../../Assets/Images/PTRLogo.png"
import { Box,Button,Flashbar, Container, FormField, Input, SpaceBetween } from '@cloudscape-design/components'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { forgotPwd } from "Redux-Store/authenticate/ForgotPwd/forgotPwdThunk";
const ForgotPassword = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch();
 // Initialize useNavigate
   const [email, setEmail] = useState("");
   const { loading, error } = useSelector((state) => state.forgotPwd);
   const [items, setItems] = React.useState([]);
 

    const handleSubmit = (e)=> {
      localStorage.setItem("email", JSON.stringify(email));
      dispatch(forgotPwd(email))
      .unwrap()
      .then(() => {
          console.log("");
          setEmail("")
          setItems([
            {
              type: "success",
              content: "Password reset mail has sent to the entered mail id Successfully!",
              dismissible: true,
              dismissLabel: "Dismiss message",
              onDismiss: () => setItems([]),
              id: "message_1"
            }
         
          ])
           // Navigate to the sign-in page after a delay
           setTimeout(() => {
             navigate("/auth/OtpVerification"); // Navigate to OTP verification page
          }, 5000); // 15 seconds delay
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
    };
    
  return (
    <div className='login_page'>
      <img src={PTRLogo} alt="" />
      <img className='login_page_vector' src={vector} alt="" />
      <Flashbar items={items}></Flashbar>
     <form  onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}>
      <Container
      header={
          <SpaceBetween direction='vertical' alignItems='center'>
        <Box variant='h1'>Forget Your Password</Box>
        <Box textAlign='center'  variant='small'>Enter your email to proceed with the password reset. </Box>
      </SpaceBetween>
      }
      >
          <SpaceBetween direction="vertical" size="xs">
            <FormField errorText="" label="Email">
            <Input
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.detail.value)}
                />
            </FormField>
        
            <Button  variant='primary' disabled={loading}  fullWidth>{loading ? "Sending OTP..." : "Send OTP"}</Button>
            <Button variant='link' fullWidth onClick={() => navigate("/auth/signin")}>Sign In</Button>
            {error && (
                <div style={{ color: "red", textAlign: "center" }}>
                  {error.message || "An error occurred"}
                </div>
              )}
          </SpaceBetween>
      </Container>
          </form>
    </div>
  )
}

export default ForgotPassword