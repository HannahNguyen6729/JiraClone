import React from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <div className="menu" style={{marginLeft: 80}} >
      <div className="account">
        <div className="avatar">
          <img src={require("../../assets/img/logo.png" )} alt='logo' />
        </div>
        <div className="account-info">
          <p>Projects</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-cog mr-1" />
          <NavLink className='text-dark' to='/jiraproject' activeClassName="active font-weight-bold">Create Project</NavLink>
        </div>
        <div>
          <i className="fa fa-cog mr-1" />
          <NavLink className='text-dark' to='/jiramanagement' activeClassName="active font-weight-bold">Manage Project</NavLink>
        </div>
        <div>
          <i className="fa fa-credit-card mr-1" />
          <NavLink className='text-dark' to='/jiraboard' activeClassName="active font-weight-bold">Tasks Board</NavLink>
        </div>
        <div>
          <i className="fa fa-cog mr-1" />
          <NavLink className='text-dark' to='/jirauser' activeClassName="active font-weight-bold"> Manage user</NavLink>
        </div>
      </div>
      <div className="feature" >
        <div>
          <i className="fa fa-truck mr-1 "  />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals mr-1" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste mr-1" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow mr-1" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box mr-1" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
