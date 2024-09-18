
import { TopNavigation, Input } from '@cloudscape-design/components';
import React from 'react';
import logo from '../../Assets/Images/Logo.png';
import { useNavigate } from 'react-router-dom';


const TopBar = () => {
  const navigate = useNavigate();
  return (
    <div id='header' style={{position: 'sticky', zIndex: 1000, top: 0, left: 0, right: 0}}>
      <TopNavigation
        identity={{
          href: "#",
          title: "Packer App",
          logo: {
            src: logo, // Use the imported logo here
            alt: "Service"
          }
        }}
        utilities={[
          {
            type: "button",
    iconName: "notification",
    title: "Notifications",
    ariaLabel: "Notifications (unread)",
    badge: true,
    disableUtilityCollapse: false,
    onClick: () => {
      navigate('/app/notifications'); // assuming '/notifications' is the route to your notifications file
    }
  },
       
          {
            type: "button",
            text: "Fatima Tabassum",
            description: "fatimatabassum743@gmail.com",
            iconName: "user-profile",
            onClick: () => {
              navigate('/app/ProfileDetails'); // assuming '/notifications' is the route to your notifications file
            }
         
          
          }
        ]}
     
      />
    </div>
  );
};

export default TopBar;

