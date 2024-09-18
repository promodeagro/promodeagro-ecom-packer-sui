import React from 'react';
import { Alert, SpaceBetween, Button } from '@cloudscape-design/components';

const Notifications = () => {
  const notifications = [
    {
      id: 54764,
      date: '30-08-2024',
      time: '11:30 AM',
      message: 'You have received a new Order ID',
    },
    {
      id: 54764,
      date: '30-08-2024',
      time: '11:30 AM',
      message: 'You have received a new Order ID',
    },
    {
      id: 54764,
      date: '30-08-2024',
      time: '11:30 AM',
      message: 'You have received a new Order ID',
    },
    {
      id: 54764,
      date: '30-08-2024',
      time: '11:30 AM',
      message: 'You have received a new Order ID',
    },
  ];

  return (
    <SpaceBetween size="s" direction="vertical">
      {notifications.map((notification, index) => (
        <Alert
          key={index}
          type="info"
          header={`${notification.message} (${notification.id})`}
          dismissible={true}
          onDismiss={() => console.log(`Dismissed notification ${notification.id}`)}
        >
          {`${notification.date} (${notification.time})`}
        </Alert>
      ))}
    </SpaceBetween>
  );
};

export default Notifications;
