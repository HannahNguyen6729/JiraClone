import { Route } from "react-router-dom";
import React from 'react';
import Header from "../components/Header/Header";

export  default function HomeTemplate (props){
    const {Comp, ...restParam} = props;
    
    return <Route {...restParam} render ={routeProps => { 
        return (
        <>
            <Header/>
            <Comp {...routeProps}/>
        </>
    )}}/>
}