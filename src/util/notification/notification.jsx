import {  notification } from 'antd';

export const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
      description: '',
    });
  };