import React from 'react'
import Header from '../../components/Header/Header'
import {useSelector} from 'react-redux';

export default function Home() {
  const userInfo = useSelector(state => state.UserLoginReducer)
  return (
    <div>
        home
        <p> User name: {userInfo.name}</p>
        <p>Avatar: </p>
        <img src={userInfo.avatar} alt="avatar" />
    </div>
  )
}
