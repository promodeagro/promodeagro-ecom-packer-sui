import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SideNavigation from "@cloudscape-design/components/side-navigation";
import { Badge, Box } from "@cloudscape-design/components";

const pages = [
  { type: "link", text: "Home", href: "/app/Home" },
  { type: "link", text: "Packed Orders", href: "/app/Orders" },
  { type: "link", text: "Profile Details", href: "/app/inventory" },
  { type: "divider" },
  {
    type: "link",
    text: "Notifications",
    href: "/notifications",
    info: <Badge color="red">23</Badge>,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access current location
  const [activeHref, setActiveHref] = React.useState("");

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
    <SideNavigation
      activeHref={activeHref}
      header={{ href: "/", text: <Box variant="h4">Maruti S</Box> }}
      onFollow={handleFollow}
      items={pages}
    />
  );
};

export default Sidebar;
