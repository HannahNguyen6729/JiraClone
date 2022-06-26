import React from "react";

export default function InfoMain(props) {
  const {projectDetail} = props;
  return (
    <div className="info" style={{ display: "flex" }}>
      <div className="search-block pt-1">
        <input className=' form-control form-control-sm' type='search' placeholder='Search' />
      </div>
      <div className="avatar-group" style={{ display: "flex" }}>
        {projectDetail.members?.map((member, index) => (
          <div className="avatar" key={index}>
          <img src={member.avatar} alt={member.userId} />
        </div>
        ))}
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


