import React, { useState } from 'react'
import vector from "../../Assets/Images/Vector.png"
import PTRLogo from "../../Assets/Images/PTRLogo.png"
import { Box,Button, Container, FormField, Input, SpaceBetween } from '@cloudscape-design/components'
const CreateNewPassword = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = (e)=> {

    }
  return (
    <div className='login_page'>
      <img src={PTRLogo} alt="" />
      <img className='login_page_vector' src={vector} alt="" />

     <form onSubmit={handleSubmit}>
      <Container
      header={
          <SpaceBetween direction='vertical' alignItems='center'>
        <Box variant='h1'>Create New Password</Box>
        <Box  variant='small'>Create a strong new password for your account.</Box>
      </SpaceBetween>
      }
      >
          <SpaceBetween direction="vertical" size="xs">
            <FormField errorText="" label="Enter New Password">
              <Input value={password} onChange={(e)=> setPassword(e.detail.value)} type='password' placeholder='Enter New Password' />
            </FormField>
            <FormField errorText="" label="Confirm Password">
              <Input  value={confirmPassword} onChange={(e)=> setConfirmPassword(e.detail.value)} type='password'  placeholder='Confirm Password'/>
            </FormField>
        
            <Button  variant='primary' fullWidth>Create Password</Button>
            <Button variant='link' fullWidth>Cancel</Button>
          </SpaceBetween>
      </Container>
          </form>
    </div>
  )
}

export default CreateNewPassword