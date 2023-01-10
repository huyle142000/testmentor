import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getListProjectAPI } from "../../redux/action/ProjectAction";
import "./project.css";
let amountOfProjectPerPage = 7;
export default function ProjectAll() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { arrListProject } = useSelector((state) => state.ProjectReducer);
  let [curPage, setCurPage] = useState(1);
  let [totalPage, setTotalPage] = useState("");
  useEffect(() => {
    let arr = [];
    let arrLengthNumOfPage = Math.ceil(
      arrListProject.length / amountOfProjectPerPage
    );
    for (let index = 0; index < arrLengthNumOfPage; index++) {
      arr.push(index);
    }
    setTotalPage(arr);
  }, [arrListProject]);
  useEffect(() => {
    dispatch(getListProjectAPI());
  }, []);
  return (
    <div className="project container">
      <div className="title_project">
        <h3>Projects</h3>
        <div>
          <p
            onClick={() => {
              navigate("/createproject");
            }}
          >
            Create project
          </p>
        </div>
      </div>
      <div className="project_search">
        <span>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" />
        </span>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project Name</th>
            <th>Category Name</th>
            <th>Creator</th>
            <th>Member</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {arrListProject.map((project, index) => {
            let start = (curPage - 1) * amountOfProjectPerPage;
            let end = curPage * amountOfProjectPerPage;

            if (index >= start && index < end) {
              return (
                <tr key={index}>
                  <td>{project.id}</td>
                  <td>{project.projectName}</td>
                  <td>{project.categoryName}</td>
                  <td>{project.creator.name}</td>
                  <td className="wrap_avatar">
                    {project.members?.length != 0
                      ? project.members?.map((member, i) => {
                          return (
                            <Fragment key={i}>
                              {i == 2 && (
                                <span className="avatar_circle cir-orange ">
                                  {`+${project.members.length - 2}`}
                                </span>
                              )}
                              {i < 2 && (
                                <img
                                  className="cir-gray"
                                  src={member.avatar}
                                  alt=""
                                />
                              )}
                            </Fragment>
                          );
                        })
                      : "..."}
                  </td>
                  <td>
                    <i className="fa-solid fa-ellipsis"></i>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="numberPage" colSpan={6}>
              <i
                onClick={() => {
                  if (curPage >= 2) {
                    setCurPage((prev) => prev - 1);
                  }
                }}
                className={`fa-solid fa-chevron-left arrow-icon ${
                  curPage == 1 && "disabled"
                }`}
              ></i>
              {totalPage.length != 0 &&
                totalPage?.map((index) => {
                  let result = "";
                  let afterPage = curPage + 2;
                  let beforePage = curPage - 2;
                  result = (
                    <span
                      key={index}
                      className={`page_span ${
                        index + 1 == curPage && "active"
                      }`}
                      onClick={() => {
                        setCurPage(index + 1);
                      }}
                    >
                      {index + 1}
                    </span>
                  );
                  if (totalPage.length > 5) {
                    if (index < beforePage) {
                      result = (
                        <span key={index} className={`page_span`}>
                          ...
                        </span>
                      );
                    } else if (index >= afterPage) {
                      result = (
                        <span key={index} className={`page_span`}>
                          ...
                        </span>
                      );
                    }
                  }
                  if (index == 0) {
                    result = (
                      <span
                        key={index}
                        className={`page_span ${
                          index + 1 == curPage && "active"
                        }`}
                        onClick={() => {
                          setCurPage(index + 1);
                        }}
                      >
                        {index + 1}
                      </span>
                    );
                  }
                  if (index == totalPage.length - 1) {
                    result = (
                      <span
                        key={index}
                        className={`page_span ${
                          index + 1 == curPage && "active"
                        }`}
                        onClick={() => {
                          setCurPage(index + 1);
                        }}
                      >
                        {index + 1}
                      </span>
                    );
                  }
                  if (curPage == totalPage.length) {
                    if (index >= curPage - 3) {
                      result = (
                        <span
                          key={index}
                          className={`page_span ${
                            index + 1 == curPage && "active"
                          }`}
                          onClick={() => {
                            setCurPage(index + 1);
                          }}
                        >
                          {index + 1}
                        </span>
                      );
                    }
                  }
                  return result;
                })}

              <i
                className={`fa-solid fa-chevron-right arrow-icon ${
                  curPage == totalPage.length && "disabled"
                }`}
                onClick={() => {
                  if (curPage >= 1 && curPage <= totalPage.length) {
                    setCurPage((prev) => prev + 1);
                  }
                }}
              ></i>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
