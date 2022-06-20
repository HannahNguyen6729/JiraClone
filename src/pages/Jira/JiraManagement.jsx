import React from "react";
import { Button, Space, Table, Tag, Avatar,Popover,AutoComplete, Tooltip } from "antd";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
//import ReactHtmlParser from "react-html-parser";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { GET_ALL_PROJECT_LIST_SAGA } from "../../redux/constants/JiraProjectAction";
import DrawerContent from "../../components/JiraComp/DrawerContent";
import {  Popconfirm } from "antd";
import { Fragment } from "react";

export default function JiraManagement() {
  const dispatch = useDispatch();
  let { projectArr } = useSelector((state) => state.JiraManagementReducer);
  let {userList} = useSelector((state) => state.JiraManagementReducer);
  const [name, setName] = useState('');
  let searchRef = useRef(null);
  
  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_LIST_SAGA });
  }, []);

  const showDrawer = (project) => {
    const action = {
      type: "OPEN_DRAWER",
      content: <DrawerContent />,
    };
    //dispatch action: open drawer
    dispatch(action);
    //dispatch action: show project detail when click edit button
    dispatch({ type: "SHOW_EDITED_PROJECT", payload: project });
  };

  const deleteProject = (id) => {
    dispatch({ type: "DELETE_PROJECT_SAGA", payload: id });
  };
  const deleteMember = (IDs) => {
    dispatch({ type: "DELETE_MEMBER_SAGA", payload: IDs });
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Project name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (a, b) => {
        let name1 = a.projectName?.trim().toLowerCase();
        let name2 = b.projectName?.trim().toLowerCase();
        if (name1 < name2) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (text, record, index) => {
        switch (text) {
          case 1: {
            return "WEB";
          }
          case 2: {
            return "SOFTWARE";
          }
          case 3: {
            return "MOBILE";
          }
          default:
            return;
        }
      },
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      render: (text, record, index) => (
        <Tag color="blue">{record.creator?.name}</Tag>
      ),
      sorter: (a, b) => {
        let name1 = a.creator.name?.trim().toLowerCase();
        let name2 = b.creator.name?.trim().toLowerCase();
        if (name1 < name2) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (text, record, index) => {
        let projectId = record.id;
        return (
          <>
            {record.members?.slice(0,3).map((item, index) => (
              <Popover key={index} title="All members" placement="topRight" content={()=>{
                const dataSource = record.members;
                const columns = [
                  {
                    title: 'Id',
                    dataIndex: 'userId',
                    key: 'userId',
                  },
                  {
                    title: 'Avatar',
                    dataIndex: 'avatar',
                    key: 'avatar',
                    render: (text,record, index) => <img src={record.avatar} alt={record.name} width={25}/>
                  },
                  {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                  },
                  {
                    title: 'Action',
                    key: 'action',
                    render: (text,record, index)=> (
                      <Button 
                          size= 'small' danger icon={<DeleteOutlined />} 
                          onClick={() => deleteMember({projectId, userId: record.userId})}
                      />
                      )
                  },
                ];
                return (<Table rowKey={'id'} dataSource={dataSource} columns={columns} size="small"/>)
              }}>
                <Avatar key={index}  size='small' src={item.avatar} />
              </Popover>
            ))}
            
            {record.members?.length > 3? <Avatar size='small'>...</Avatar> : ''}
            <Popover placement="topLeft" title={'Add more'} trigger="click" content={()=> ( 
              <AutoComplete
                style={{width:'100%'}}
                placeholder="Search"
                onSearch={(value)=> {
                   if(searchRef.current !== null){
                    clearTimeout(searchRef.current);
                   }
                    searchRef.current = setTimeout(()=> {
                    dispatch({type: 'GET_USERS_BY_NAME_SAGA',payload: value})
                  }, 500)
                  
                } }
                options={userList.map((item,i)=> ({label: item.name, value: item.userId.toString()}))}
                onSelect={(value, option)=> {
                  setName(option.label);
                  dispatch({type: 'ADD_MORE_MEMBERS_SAGA', payload: {projectId: record.id , userId: option.value}})
                }} 
                value={name}
                onChange={text=> setName(text)}
              />)}
            >
              <Button shape='circle' size='small'>+</Button>
            </Popover>
          </>
        )
      },
    },
    // {
    //     title: "Description",
    //     dataIndex: "description",
    //     key: "description",
    //     render: (text, record, index) => {
    //       // console.log('text', text)
    //       // console.log('record', record)
    //       // console.log('index', index)
    //       let htmlContent = ReactHtmlParser(text);
    //       return <>{htmlContent}</>;
    //     },
    //   },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <button
              onClick={() => showDrawer(record)}
              className="btn btn-outline-info btn-sm"
            >
              <EditOutlined />
            </button>
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={() => {
                deleteProject(record.id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-outline-danger btn-sm">
                <DeleteOutlined />
              </button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <div className="container mt-5 mx-4">
      <h4>Jira Project Management</h4>
      <Space
        style={{
          marginBottom: 16,
        }}
      ></Space>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={projectArr}
        // onChange={handleChange}
      />
    </div>
  );
}
