import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import vector from "../../Assets/Images/Vector.png";
import PTRLogo from "../../Assets/Images/PTRLogo.png";
import { Box, Button, Flashbar, Container, FormField, Input, SpaceBetween } from '@cloudscape-design/components';
import { useNavigate, useLocation } from 'react-router-dom';
import { LuEyeOff } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { resetPassword } from "Redux-Store/authenticate/newpwd/newPwdThunk";

const CreateNewPassword = () => {
  const location = useLocation();
  const { OTP } = location.state || {}; // Destructure the OTP from state
  console.log(OTP, "otp from otp page");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [items, setItems] = React.useState([]);
  const [confirmationCode, setConfirmationCode] = React.useState(""); // Initialize as empty string
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // State for success message

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.resetPwd);
  const emailVal = localStorage.getItem("email");
  const parsedEmail = JSON.parse(emailVal);
  const email = parsedEmail;

  // Set confirmationCode to OTP when component mounts
  useEffect(() => {
    if (OTP) {
      setConfirmationCode(OTP); // Set the confirmationCode state
    }
  }, [OTP]);

  const handleSubmit = () => {
    if (newPassword === confirmPassword) {
      dispatch(resetPassword({ email, confirmationCode, newPassword })) // Use confirmationCode instead of OTP
        .unwrap()
        .then(() => {
          // If the API call is successful
          setItems([
            {
              type: "success",
              content: "Password has been changed successfully!",
              dismissible: true,
              dismissLabel: "Dismiss message",
              onDismiss: () => setItems([]),
              id: "message_1",
            },
          ]);
          setIsSuccess(true); // Set success state to true
          // Reset fields
          setNewPassword("");
          setConfirmPassword("");
          localStorage.removeItem("email");

          // Navigate to the sign-in page after a delay
          setTimeout(() => {
            navigate("/auth/signin");
          }, 13000); // 13 seconds delay

          console.log(email);
          console.log(confirmationCode); // Log confirmationCode
          console.log(newPassword);
        })
        .catch((error) => {
          // If the API call fails, show error flashbar
          setItems([
            {
              type: "error",
              content: `Password reset failed: ${error.message}`,
              dismissible: true,
              dismissLabel: "Dismiss message",
              onDismiss: () => setItems([]),
              id: "message_2",
            },
          ]);
        });
      setLocalError("");
    } else {
      setLocalError("Passwords do not match!");
    }
  };

  // Extract the error message if the error is an object
  const errorMessage = typeof error === "string" ? error : error?.message;

  return (
    <div className="login_page">
      <img src={PTRLogo} alt="" />
      <img className="login_page_vector" src={vector} alt="" />
      <Flashbar items={items} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Container
          header={
            <SpaceBetween direction="vertical" alignItems="center">
              <Box variant="h1">Create New Password</Box>
              <Box variant="small">
                Create a strong new password for your account.
              </Box>
            </SpaceBetween>
          }
        >
          <SpaceBetween direction="vertical" size="xs">
            <FormField label="Enter New Password">
              <div style={{ position: "relative", width: "100%" }}>
                <Input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.detail.value)}
                  style={{ paddingRight: "40px" }} // Adjust padding for the icon
                />
                <div
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#8B8D97", // Adjust color as needed
                  }}
                >
                  {passwordVisible ? <FiEye /> : <LuEyeOff />}
                </div>
              </div>
            </FormField>
            <FormField label="Confirm">
              <div style={{ position: "relative", width: "100%" }}>
                <Input
                  type={newPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.detail.value)}
                />
                <div
                  onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#8B8D97", // Adjust color as needed
                  }}
                >
                  {newPasswordVisible ? <FiEye /> : <LuEyeOff />}
                </div>
              </div>
            </FormField>

            <Button
              fullWidth
              ariaExpanded
              variant="primary"
              type="submit"
              loading={loading}
            >
              Create Password
            </Button>
            <Button variant="link" fullWidth onClick={() => navigate("/auth/signin")}>
              Cancel
            </Button>
          </SpaceBetween>
        </Container>
      </form>
    </div>
  );
};

export default CreateNewPassword;
