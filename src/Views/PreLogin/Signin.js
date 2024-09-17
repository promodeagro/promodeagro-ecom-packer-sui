import React from 'react'
import vector from "../../Assets/Images/Vector.png"
import PTRLogo from "../../Assets/Images/PTRLogo.png"
import { Box,Button, Container, FormField, Input, SpaceBetween } from '@cloudscape-design/components'
import { useNavigate } from 'react-router-dom'
const Signin = () => {
  const navigate = useNavigate()
  const handleSubmit = () =>{


    navigate('/app/home')
  }
  return (
    <div className='login_page'>
      <img src={PTRLogo} alt="" />
      <img className='login_page_vector' src={vector} alt="" />

<form onSubmit={handleSubmit}>
      <Container
      header={
        <SpaceBetween direction='vertical' alignItems='center'>
        <Box variant='h1'>Welcome</Box>
        <Box  variant='small'>Login to your account</Box>
      </SpaceBetween>
      }
      >
          <SpaceBetween direction="vertical" size="xs">
            <FormField label="Email">
              <Input placeholder='Enter Your Email' />
            </FormField>
            <FormField label="Password">
              <Input placeholder='Enter Your Password'/>
            </FormField>
           <span>
            <Button variant='link'>Forget Password</Button>
            </span>
            <Button variant='primary' fullWidth>Login</Button>
          </SpaceBetween>

      </Container>
        </form>
    </div>
  )
}

export default Signin