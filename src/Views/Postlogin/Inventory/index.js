import { Box, Button, Container, Form, FormField, Header, Icon, Input, SpaceBetween } from '@cloudscape-design/components'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ProfileDetails = () => {
  const navigate = useNavigate();

  // have to change these value after getting api's 
  const [username, setUsername] = useState("salmanbinmoosa")
  const [email, setEmail] = useState("salmanbinmoosa@gmail.com")
  const [password, setPassword] = useState("")
  
  // handle form state
  const [formEdit, setFormEdit] = useState(false)
  


  const handleForm = (e) =>{
    e.preventDefault()

  }
  return (
   <>
   <Header variant='h3'>
    <SpaceBetween size='xs' direction='horizontal' alignItems='center' >
      <Button onClick={()=>navigate(-1)} iconName='arrow-left' variant='icon'/>
        Profile Details
      </SpaceBetween>
   </Header>


   <form onSubmit={handleForm}>
          <SpaceBetween  direction="vertical" size="l">
          <Box
          >
            <div 
            style={{
              width:"100px" ,
              height:"100px" ,
              borderRadius:"50%" ,
              display:"flex" ,
              border:"1px solid #D9D9D9",
              alignItems:"center" ,
              justifyContent:"center",
              margin:"0 auto"
            }}
            >
        <Icon variant='disabled' name="user-profile" size="large" />
        </div>
      </Box>
            <FormField label="User Name">
            <Input  onChange={(e) => setUsername(e.detail.value)} value={username}  />
            </FormField>
            <FormField label="Email">
              <Input  onChange={(e) => setEmail(e.detail.value)} value={email} type='email' />
            </FormField>
            <FormField  label="Password">
              <Input onChange={(e)=> setPassword(e.detail.value)} value={password} type='password' placeholder='**********' />
            </FormField>
            {formEdit ? (
          // If formEdit is true, render the "Update" button
          <Button fullWidth variant='primary'>Update</Button>

        ) : (
          // If formEdit is false, render the "Edit" button
          <Button fullWidth variant='primary'>Continue</Button>

        )}
            
            <Button onClick={()=> setFormEdit(true)} fullWidth variant='inline-link' iconName='edit'> Edit</Button>
            <Button onClick={()=> setFormEdit(true)} fullWidth variant='inline-link' iconName='edit'>Cancel</Button>
          </SpaceBetween>
          </form>
   </>
  )
}

export default ProfileDetails