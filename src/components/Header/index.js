
import { TopNavigation, Input } from '@cloudscape-design/components';
import React from 'react';
import logo from '../../Assets/Images/PTRLogo.png';


const TopBar = () => {
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
            disableUtilityCollapse: false
          },
       
          {
            type: "menu-dropdown",
            text: "Fatima Tabassum",
            description: "fatimatabassum743@gmail.com",
            iconName: "user-profile",
            items: [
              { id: "profile", text: "Profile" },
              { id: "preferences", text: "Preferences" },
              { id: "security", text: "Security" },
              {
                id: "support-group",
                text: "Support",
                items: [
                 
                  { id: "support", text: "Support" },
                  {
                    id: "feedback",
                    text: "Feedback",
                    href: "#",
                    external: true,
                    externalIconAriaLabel:
                      " (opens in new tab)"
                  }
                ]
              },
              { id: "signout", text: "Sign out" }
            ]
          }
        ]}
     
      />
    </div>
  );
};

export default TopBar;

