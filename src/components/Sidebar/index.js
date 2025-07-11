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
        // const token = parsedUserData.accessToken;
       const token="eyJraWQiOiIyUEsySUZRM3o4VGZjOFQrR0w4WFFOMmY0cDljRXpReEZRMFdwNUZLdDVVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjMTUzYWQ5YS1iMGIxLTcwZjUtOTYwNS0xMTZkYmJhNjMyMjMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX2VRQWlkVWVuciIsImNsaWVudF9pZCI6IjFiMjVzYTRvNHFvN3VtN2ZubWI2ZGlhZTU4Iiwib3JpZ2luX2p0aSI6ImNmNTc0NDI4LTUyZjItNDI0MS04NDk1LTUwYzY5ZTM4MWExZiIsImV2ZW50X2lkIjoiMmIyMWM5NjItYWFhMS00NDAwLTg0MDktZGFjMjhmMjZlZWVmIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTczMzQ3ODg4OCwiZXhwIjoxNzMzNTY1Mjg4LCJpYXQiOjE3MzM0Nzg4ODgsImp0aSI6ImY0NWJiODkxLWU2NWUtNDY5MC04NGUxLWE1ZDc4MmU0MWI0OCIsInVzZXJuYW1lIjoiYzE1M2FkOWEtYjBiMS03MGY1LTk2MDUtMTE2ZGJiYTYzMjIzIn0.YmbiXsEQo7rYmo_7fCOadjKOBq3vvMElXnNyfmidUoMwVWZ8db8egR4hms7BxyiX2ml3KJqiPDm2WBJ8YtMTe_qbei5FWe4x9AgsoyupSIL-053EYFD41ZqmZSxGoM9EhCllQ_wROQ0CD1iMbU5zJzXaH65XSdoIOy-5LAeTFEUFlDUKVNFGGEAfTzRgErEnzEmQQUL8oaSc3FyeuGdAtYfEDCClHd3B_rjZyBFAv6Se_OF2Sgy5pWxfaXEUqSf2_UkQqADF3oYjhAwhMM96szPF0t2hmNhJTZw0Axda73yvIAmAU1l8TQ_6-7QBKIYUyaJZjBRT_UvbLRSOUIeqiQ"

        if (token) {
          dispatch(authSignOut({ accessToken: token })) // Pass the token in the expected format
            .unwrap()
            .then((response) => {
         
              console.log("Sign-out Response:", response);
              localStorage.removeItem("user");
              localStorage.removeItem("email");
              localStorage.removeItem("userEmail");
              navigate("/auth/signin", { state: { logoutSuccess: true } });
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
  // //using this for protected routing
  // const [updatedEmail, setUpdatedEmail] = useState(null);
  // useEffect(() => {
  //   try {
  //     // Check if userEmail is null or empty, and handle redirect
  //     if (!userEmail) {
  //       throw new Error("userEmail is null or empty");
  //     }

  //     // Attempt to manipulate userEmail
  //     const newEmail = userEmail.replace(/["\d+]|@gmail\.com/g, "");
  //     setUpdatedEmail(newEmail);
      
  //   } catch (error) {
  //     console.error(error.message);
  //     // Redirect to auth/signin page if there is an error
  //     // navigate('/auth/signin');
  //   }
  // }, [userEmail, navigate]);




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
    </div> <Box variant="h3">{userEmail}</Box></div> }}
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
