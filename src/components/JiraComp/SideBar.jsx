import React from "react";
import {
  ExpandAltOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Item } from "antd";
import { useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import DrawerCreateTask from "./DrawerCreateTask";
const { Header, Sider, Content } = Layout;

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch= useDispatch();

  return (
    <>
      <Sider trigger={null} collapsible collapsed={!collapsed} 
      style={{position:'fixed',height: '100%',
      boxShadow: collapsed? '0 4px 10px 0 rgb(0 0 0 / 40%), 5px 5px 15px 0 rgb(0 0 0 / 40%)': '' }}>
        <div
          className="text-right text-light"
          style={{cursor: 'pointer'}}
          onClick={() => {setCollapsed(!collapsed)}}
        >
          <ExpandAltOutlined />
        </div>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <PlusOutlined />,
              label: "Create Task",
              onClick: ()=>{ dispatch({
                type: 'OPEN_DRAWER_CREATE_TASK', 
                title: "Create Task", 
                content: <DrawerCreateTask/>})}
            },
            {
              key: "2",
              icon: <SearchOutlined />,
              label: "Search Issues",
            },
          ]}
        />
      </Sider>
    </>
  );
}
