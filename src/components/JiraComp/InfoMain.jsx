import React from "react";

export default function InfoMain() {
  return (
    <div className="info" style={{ display: "flex" }}>
      <div className="search-block">
        <input className="search" />
        <i className="fa fa-search" />
      </div>
      <div className="avatar-group" style={{ display: "flex" }}>
        <div className="avatar">
          <img src={require("../../assets/img/1.jpg")} alt='img1' />
        </div>
        <div className="avatar">
          <img src={require("../../assets/img/2.jpg")} alt='img2' />
        </div>
        <div className="avatar">
          <img src={require("../../assets/img/3.jpg")} alt='img3' />
        </div>
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Only My Issues
      </div>
      <div style={{ marginLeft: 20 }} className="text">
        Recently Updated
      </div>
    </div>
  );
}
