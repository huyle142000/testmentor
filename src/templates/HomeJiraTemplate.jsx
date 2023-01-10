import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./hometemplate.css";
export default function HomeJiraTemplate() {
  let [active, setActive] = useState("active1");
  let navigate = useNavigate();
  return (
    <>
      <div className="header_nav">
        <ul className="detail_nav-list">
          <li
            className={`detail_nav-item ${"active1" == active && active}`}
            onClick={() => {
              setActive("active1");
              navigate("/projectall");
            }}
          >
            <p>Projects</p>
          </li>
          <li
            className={`detail_nav-item ${"active2" == active && active}`}
            onClick={() => {
              setActive("active2");
              navigate("/user");
            }}
          >
            <p>Users</p>
          </li>
          <li
            className={`detail_nav-item ${"active3" == active && active}`}
            onClick={() => {
              setActive("active3");
              navigate("createproject");
            }}
          >
            <p>Create Task</p>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}
