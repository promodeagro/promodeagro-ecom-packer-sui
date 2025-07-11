import React, { useEffect, useState } from 'react';
import { Alert, SpaceBetween, Spinner } from '@cloudscape-design/components';
import { preLoginService } from '../../../Services';
import config from '../../Config';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const jwtToken = user?.accessToken || user?.token;
        // console.log("Token being sent in Authorization header:", jwtToken);
        const userId = user?.userId || user?.id || user?.user_id;
        const response = await preLoginService.get(`${config.NOTIFICATIONS}?user_id=${userId}`);
        setNotifications(response.data || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <Alert type="error" header="Error">{error}</Alert>;

  return (
    <SpaceBetween size="s" direction="vertical">
      {notifications.length === 0 ? (
        <Alert type="info" header="No notifications">You have no notifications.</Alert>
      ) : (
        notifications.map((notification, index) => (
          <Alert
            key={index}
            type="info"
            header={`${notification.message} (${notification.id})`}
            dismissible={true}
            onDismiss={() => setNotifications(notifications.filter((_, i) => i !== index))}
          >
            {`${notification.date} (${notification.time})`}
          </Alert>
        ))
      )}
    </SpaceBetween>
  );
};

export default Notifications;
