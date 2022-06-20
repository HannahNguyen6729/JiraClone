import React from 'react'

export default function HeaderMain() {
  return (
    <div className="header">
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
        <li className="breadcrumb-item">Projects</li>
        <li className="breadcrumb-item">CyberLearn</li>
        <li className="breadcrumb-item active" aria-current="page">
          Kanban Board
        </li>
      </ol>
    </nav>
  </div>
  )
}
