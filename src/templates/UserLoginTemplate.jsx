import React from 'react'
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import {useState, useEffect} from 'react';
const { Header, Footer, Sider, Content } = Layout;


export default function UserLoginTemplate(props) {
  const [size, setSize] = useState({width:window.innerWidth, height:window.innerHeight});
  const {Comp, ...restParam} = props;

  useEffect(()=>{
    const handleResize = () => {
      setSize({width:window.innerWidth, height:window.innerHeight});
    }
    window.addEventListener('resize', handleResize);
    //clean up function
    return ()=>{
      window.removeEventListener('resize', handleResize);
    }
  },[]);
  
  return <Route {...restParam} render={routeProps =>{
    return (
    <Layout>
      <Sider width={Math.round(size.width/2)}
              style={{height: Math.round(size.height), 
              backgroundImage: `url('https://picsum.photos/900')`
              }}>
      </Sider>
      <Layout style={{backgroundColor: "white"}} >
        <Content style={{height: Math.round(size.height)}}>
          <Comp {...routeProps} />
        </Content>
      </Layout>
    </Layout>
    )
  }} />
}
