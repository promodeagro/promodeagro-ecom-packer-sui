import React, { useEffect,useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import SideNavigation from "@cloudscape-design/components/side-navigation";
import { Badge, Box, Button,Icon } from "@cloudscape-design/components";
import { authSignOut } from "Redux-Store/authenticate/signout/signoutThunk";
const pages = [
  { type: "link", text: "Home", href: "/app/Home" },
  { type: "link", text: "Packed Orders", href: "/app/PackedOrders" },
  { type: "link", text: "Profile Details", href: "/app/ProfileDetails" },
  { type: "divider" },
  {
    type: "link",
    text: "Notifications",
    href: "/app/notifications",
    info: <Badge color="red">23</Badge>,
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access current location
  const [activeHref, setActiveHref] = React.useState("");
  const userEmail = localStorage.getItem("userEmail");
  const userData = localStorage.getItem("user");
  const handleSignOut = () => {

    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        console.log("parsed", parsedUserData.accessToken);
        const token = parsedUserData.accessToken;

        if (token) {
          dispatch(authSignOut({ accessToken: token })) // Pass the token in the expected format
            .unwrap()
            .then((response) => {
         
              console.log("Sign-out Response:", response);
              localStorage.removeItem("user");
              localStorage.removeItem("email");
              localStorage.removeItem("userEmail");

              navigate("/auth/signin")
            })
            .catch((error) => {
              console.error("Sign-out failed:", error);
            });

        } else {
          console.error("No access token found in user data.");
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    } else {
      console.warn("No user data found.");
    }
  };
  //using this for protected routing
  const [updatedEmail, setUpdatedEmail] = useState(null);
  useEffect(() => {
    try {
      // Check if userEmail is null or empty, and handle redirect
      if (!userEmail) {
        throw new Error("userEmail is null or empty");
      }

      // Attempt to manipulate userEmail
      const newEmail = userEmail.replace(/["\d+]|@gmail\.com/g, "");
      setUpdatedEmail(newEmail);
      
    } catch (error) {
      console.error(error.message);
      // Redirect to auth/signin page if there is an error
      navigate('/auth/signin');
    }
  }, [userEmail, navigate]);




  useEffect(() => {
    setActiveHref(location.pathname); // Set activeHref to current path
  }, [location.pathname]); // Update activeHref when location changes

  const handleFollow = (event) => {
    const { href, external } = event.detail;
    if (!external) {
      event.preventDefault();
      setActiveHref(href);
      navigate(href); // Use navigate for internal links
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "90vh" }}>
    <SideNavigation
      activeHref={activeHref}
      header={{ href: "/", text:<div style={{display:"flex",gap:"10px",alignItems:"center"}}> <div 
        style={{
          width:"40px" ,
          height:"40px" ,
          borderRadius:"50%" ,
          display:"flex" ,
          border:"1px solid #D9D9D9",
          alignItems:"center" ,
          justifyContent:"center",
      
       
        }}
        >
    <Icon  variant='disabled' name="user-profile" size="medium" />
    </div> <Box variant="h3">{updatedEmail ? updatedEmail : userEmail}</Box></div> }}
      onFollow={handleFollow}
      items={pages}
    />

    <div style={{marginLeft:"30px"}}>
    <Button onClick={handleSignOut}variant="inline-link">Logout</Button>
    </div>
    </div>
  );
};

export default Sidebar;
