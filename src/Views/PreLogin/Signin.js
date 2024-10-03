import React from "react";
import vector from "../../Assets/Images/Vector.png";
import PTRLogo from "../../Assets/Images/PTRLogo.png";
import {
  Box,
  Button,
  Container,
  FormField,
  Input,
  SpaceBetween,
  Flashbar
} from "@cloudscape-design/components";
import { authSignIn } from "Redux-Store/authenticate/signin/signinThunk";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuEyeOff } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [items, setItems] = React.useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    dispatch(authSignIn({ email, password }))
      .unwrap()
      .then((response) => {
        console.log("Signin Response:", response.accessToken);
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("userEmail", JSON.stringify(email));

        setItems([
          {
            type: "success",
            content: "Signin Successful!",
            dismissible: true,
            dismissLabel: "Dismiss message",
            onDismiss: () => setItems([]),
            id: "message_1",
          },
        ]);
        navigate("/app/Home"); // Navigate to the dashboard
      })
      .catch((error) => {
        setItems([
          {
            type: "error",
            content: `Signin Failed: ${error.message}`,
            dismissible: true,
            dismissLabel: "Dismiss message",
            onDismiss: () => setItems([]),
            id: "message_2",
          },
        ]);
      });
  };
  return (
    <div className="login_page">
      <img src={PTRLogo} alt="" />
      <img className="login_page_vector" src={vector} alt="" />
      <Flashbar items={items} />

      <form>
        <Container
        
          header={
            <SpaceBetween direction="vertical" alignItems="center">
              <Box variant="h1">Welcome</Box>
              <Box variant="small">Login to your account</Box>
            </SpaceBetween>
          }
        >
          <SpaceBetween direction="vertical" size="xs">
            <FormField label="Email">
              <Input placeholder="Enter Your Email" value={email}
                onChange={(e) => setEmail(e.detail.value)} />
            </FormField>
            <FormField label="Password">
            <div style={{ position: "relative", width: "100%" }}>
                <Input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.detail.value)}
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
            {error && <p style={{ color: "red" }}>{error.message}</p>}
            <Box float="right">
              <Button
                variant="inline-link"
                onClick={() => navigate("/auth/ForgotPassword")}
              >
                Forgot Password
              </Button>
            </Box>
            <Button
                fullWidth
                ariaExpanded
                variant="primary"
                disabled={loading}
                onClick={handleLogin}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
          </SpaceBetween>
        </Container>
      </form>
    </div>
  );
};

export default Signin;
