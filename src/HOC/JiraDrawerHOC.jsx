import React from "react";
import { Button, Drawer, Space,} from "antd";
import { useSelector, useDispatch } from "react-redux";


export default function JiraDrawerHOC() {
  const { visible, DrawerContentComponent, callbackSubmit,title } = useSelector((state) => state.JiraDrawerReducer);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch({ type: "CLOSE_DRAWER" });
  };
  return (
    <>
      <Drawer
        title={`${title}`}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{paddingBottom: 80}}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={callbackSubmit} type="primary">Submit</Button>
          </Space>
        }
      >
        {DrawerContentComponent }
      </Drawer>
    </>
  );
}
