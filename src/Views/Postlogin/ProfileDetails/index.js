import { Box, Button, FormField, Header, Icon, Input, SpaceBetween, Spinner, Alert, Flashbar } from '@cloudscape-design/components'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { postLoginService } from "../../../Services";
import config from "../../../Views/Config";

const ProfileDetails = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formEdit, setFormEdit] = useState(false);
  const [flashItems, setFlashItems] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const email = localStorage.getItem("userEmail")?.replace(/"/g, "");
        const response = await postLoginService.get(`${config.PROFILE}?email=${email}`);
        setUsername(response.data.username || "");
        setEmail(response.data.email || "");
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const email = localStorage.getItem("userEmail")?.replace(/"/g, "");
      await postLoginService.post(config.PROFILE_UPDATE, { user_id: user?.userId || user?.id || user?.user_id, username, email });
      setSuccess("Profile updated successfully!");
      setFlashItems([{ type: "success", content: "Profile updated successfully!", id: "profile_success" }]);
      setFormEdit(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setFlashItems([{ type: "error", content: err.response?.data?.message || err.message, id: "profile_error" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    if (!email || !password || !confirmPassword) {
      setError("Email, new password, and confirm password are required.");
      setFlashItems([{ type: "error", content: "Email, new password, and confirm password are required.", id: "password_error" }]);
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setFlashItems([{ type: "error", content: "Passwords do not match.", id: "password_error" }]);
      setLoading(false);
      return;
    }
    try {
      await postLoginService.post(config.PROFILE_CHANGE_PASSWORD, {
        email,
        new_password: password,
        confirm_password: confirmPassword,
      });
      setSuccess("Password changed successfully!");
      setFlashItems([{ type: "success", content: "Password changed successfully!", id: "password_success" }]);
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setFlashItems([{ type: "error", content: err.response?.data?.message || err.message, id: "password_error" }]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Alert type="error" header="Error">{error}</Alert>;

  return (
   <>
   <Header variant='h3'>
    <SpaceBetween size='xs' direction='horizontal' alignItems='center' >
      <Button onClick={()=>navigate(-1)} iconName='arrow-left' variant='icon'/>
      <span className="header_underline">Profile Details</span>
      </SpaceBetween>
   </Header>
   <Flashbar items={flashItems} />
   <form onSubmit={formEdit ? handleUpdate : handleChangePassword}>
          <SpaceBetween  direction="vertical" size="l">
          <Box>
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
      <div className='details-form'>
            <FormField  label="User Name">
            <Input   onChange={(e) => setUsername(e.detail.value)} value={username}  />
            </FormField>
            <FormField label="Email">
              <Input  onChange={(e) => setEmail(e.detail.value)} value={email} type='email' />
            </FormField>
            <FormField  label="Password">
              <Input onChange={(e)=> setPassword(e.detail.value)} value={password} type='password' placeholder='**********' />
            </FormField>
            <FormField  label="Confirm Password">
              <Input onChange={(e)=> setConfirmPassword(e.detail.value)} value={confirmPassword} type='password' placeholder='**********' />
            </FormField>
            </div>
            {formEdit ? (
              <>
          <Button fullWidth variant='primary' type="submit">Update</Button>
          <Button onClick={()=> setFormEdit(false)} fullWidth variant='inline-link'>Cancel</Button>
          </>
        ) : (
          <>
          <Button fullWidth variant='primary' type="submit">Change Password</Button>
          <Button onClick={()=> setFormEdit(true)} fullWidth variant='inline-link' iconName='edit'> Edit</Button>
          </>
        )}
          </SpaceBetween>
          </form>
   </>
  )
}

export default ProfileDetails