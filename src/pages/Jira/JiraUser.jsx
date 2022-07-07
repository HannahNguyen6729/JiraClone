import React from 'react'
import { Space, Table } from 'antd';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { DELETE_USER_SAGA, GET_ALL_USER_SAGA } from '../../redux/constants/JiraProjectAction';
import DrawerEditUser from '../../components/JiraComp/DrawerEditUser';
import DrawerCreateUser from '../../components/JiraComp/DrawerCreateUser';

export default function JiraUser() {
    const dispatch= useDispatch();
    const userList = useSelector(state => state.JiraDrawerContentReducer.userList)
    const userLogin = useSelector(state => state.UserLoginReducer)
   
    useEffect(() => {
        dispatch({type: GET_ALL_USER_SAGA})  
    },[])

    const handleDeleteUser = (userID) => {
       dispatch({type: DELETE_USER_SAGA, payload: userID})
    }
    const handleEditUserInfo = (userInfo) => {
       // console.log(userInfo)
        const action = {
            type: "OPEN_DRAWER",
            content: <DrawerEditUser />,
            title: 'Edit user information'
          };
           //dispatch action: open drawer
          dispatch(action);
          //dispatch action: show user info edited when click edit button
          dispatch({ type: "SHOW_EDITED_USER", payload: {...userInfo, id: userInfo.userId} });
    }
    const handleCreateUser=() => {
        //dispatch action: open drawer
        dispatch({
            type: 'OPEN_DRAWER',
            content: <DrawerCreateUser/>,
            title: 'Create a new user'
        })
    }
    const columns = [
        {
            title: 'UserId',
            dataIndex: 'userId',
            key: 'userId',
            sorter:(a,b) => a.userId - b.userId
            // render: (text,record, index) => {
            //     console.log('text',text);
            //     console.log('record',record)
            //     console.log('index',index)
            //     return (<a>{record.userId}</a>)
            // },
          },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          sorter:(a, b) => {
            let name1 = a.name?.trim().toLowerCase();
            let name2 = b.name?.trim().toLowerCase();
            if (name1 < name2) {
              return -1;
            }
            return 1;
          },
        },
        {
          title: 'Avatar',
          dataIndex: 'avatar',
          key: 'avatar',
          render:(text, record, index)=> (
                <div className="avatar">
                     <img src={record.avatar} alt={record.name} />
                </div>
            )
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record, index) => {
            
            return (
                <Space size="small">
                  <button onClick= {() => handleEditUserInfo(record)}
                          className="btn btn-outline-primary btn-sm">Edit</button>
                  <button onClick={() => handleDeleteUser(record.userId)}
                          className="btn btn-outline-danger btn-sm"
                   >Delete</button>
                </Space>
              )
          },
        },
      ];
    const data = userList;

  return (
    <div className="container  mt-5 mx-4">
        {/*Avatar */}
        <div className="row">
            <div className="col-6">
                <button onClick= {() => handleCreateUser()}
                        className='btn btn-primary'>Create user</button>
            </div>
            <div className="col-6 d-flex justify-content-end">
                <div className='d-flex align-items-center'>
                    <span className='mr-1'>Welcome</span>
                    <span className='font-weight-bold text-uppercase text-primary'> {userLogin.name} !</span>
                    <div className="avatar ml-2">
                        <img src={userLogin.avatar} alt={userLogin.name} />
                    </div>
                </div>
            </div>
        </div>
        {/*Search bar */}
        <div className="row mt-4">
            <form className="d-flex my-2 my-lg-0">
                <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-primary mr-2" type="submit">Search</button>
                <button className="btn btn-outline-primary" type="submit">Reset</button>
            </form>
        </div>
        {/*Table */}
        <div className="row mt-4">
            <Table rowKey={'userId'} columns={columns} dataSource={data} />
        </div>
    </div>
  )
}
