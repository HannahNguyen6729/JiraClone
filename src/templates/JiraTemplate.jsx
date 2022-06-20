import React from "react";
import { Route } from "react-router-dom";
import Header from "../components/Header/Header";
import InfoModal from "../components/JiraComp/InfoModal";
import Menu from "../components/JiraComp/Menu";
import SideBar from "../components/JiraComp/SideBar";

export default function JiraTemplate(props) {
  let { Comp, ...restParam } = props;
  return <Route {...restParam} render={(routeProps)=>(
    <div className = 'jira'>
        <SideBar/>
        <Menu/>
        <Comp {...routeProps}/>
        <InfoModal/>
    </div>
  )} />
}
