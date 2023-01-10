import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createProjectAPI,
  getCategoryProjectAPI,
} from "../../redux/action/ProjectAction";
import "./creproject.css";
import { useNavigate } from "react-router-dom";
export default function CreateProject() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      projectName: "",
      description: "",
      categoryId: 1,
      alias: "",
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("ProjectName is required"),
      description: Yup.string().required("Description is required"),
      categoryId: Yup.string().required("Category is required"),
    }),
    onSubmit: (value) => {
      values.categoryId = Number(values.categoryId);
      dispatch(createProjectAPI(values, navigate));
    },
  });
  const { values, handleChange, handleSubmit, setFieldValue, handleBlur } =
    formik;
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  useEffect(() => {
    dispatch(getCategoryProjectAPI());
  }, []);
  let { arrListCategoryProject } = useSelector((state) => state.ProjectReducer);
  const renderProject = () => {
    return arrListCategoryProject.map((project) => {
      return (
        <option key={project.id} value={Number(project.id)}>
          {project.projectCategoryName}
        </option>
      );
    });
  };
  return (
    <div className="container mt-4 mb-3">
      <div className="title_nav">
        <span>Projects /</span>
        <span> New Project</span>
      </div>
      <h2>New Project</h2>
      <form action="" className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <p>
            Project Name <span className="project_required">*</span>
          </p>
          <input
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.projectName}
            type="text"
            style={{ width: "70%" }}
            name="projectName"
            className={`form-control ${
              formik.touched.projectName &&
              formik.errors.projectName &&
              "border_errors"
            }`}
          />
          {formik.touched.projectName && formik.errors.projectName ? (
            <span className="text-danger text-register d-block mb-2">
              {formik.errors.projectName}
            </span>
          ) : null}
        </div>
        <div className="form-group">
          <p>
            Project Category <span className="project_required">*</span>
          </p>
          <select
            onBlur={handleBlur}
            value={values.categoryId}
            name="categoryId"
            onChange={handleChange}
            style={{ width: "70%" }}
            className="form-control"
          >
            {renderProject()}
          </select>
          {formik.touched.categoryId && formik.errors.categoryId ? (
            <span className="text-danger text-register d-block mb-2">
              {formik.errors.categoryId}
            </span>
          ) : null}
        </div>
        <div className="form-group">
          <p>Description</p>

          <Editor
            onBlur={handleBlur}
            onEditorChange={(content, editor) => {
              setFieldValue("description", content);
            }}
            value={values.description}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            init={{
              height: 200,
              menubar: false,
              plugins: [],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          {formik.touched.description && formik.errors.description ? (
            <span className="text-danger text-register d-block mb-2">
              {formik.errors.description}
            </span>
          ) : null}
        </div>
        <button
          className="btn btn_cancel"
          type="button"
          onClick={() => {
            formik.resetForm();
          }}
        >
          Cancel
        </button>
        <button className="btn btn_second ml-3" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
