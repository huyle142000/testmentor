import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./register.css";
// import { registerAction } from "../../redux/actions/FormAction";
import "./../Login/login.css";
import { registerAPI } from "../../redux/action/FormAction";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      passWord: Yup.string()
        .required("Mật khẩu không được để trống")
        .min(3, "Mật khẩu ít nhất có 3 kí tự."),
      email: Yup.string()
        .required("Email không được để trống")
        .email("Email chưa đúng định dạng"),
      name: Yup.string()
        .required("Họ tên không được để trống")
        .matches(/^[A-Z a-z]+$/, "Họ tên không đúng định dạng"),
      phone: Yup.string()
        .required("Số điện thoại không được để trống")
        .matches(/^[0-9]*$/, "Số điện thoại phải là số"),
    }),
    onSubmit: (values) => {
      dispatch(registerAPI(values, navigate));
    },
  });

  return (
    <div className="form_jira register_jira">
      <div className="row">
        <div className="col-7">
          <img
            src="https://www.dice.com/binaries/content/gallery/dice/insights/2019/01/Bootcamp-MOOC-Learning-Tech-Coding-Programming-Dice-1024x640.png"
            className="img-fluid"
            alt=""
          />
        </div>
        <div className="col-5">
          <h2>CyberBugs Jira</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="user_box">
              <div className="wrap_input-form position-relative">
                <i className="fa-regular fa-user"></i>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  name="name"
                  placeholder="Username"
                />
              </div>
              {formik.touched.name && formik.errors.name ? (
                <span className="text-danger text-register d-block mb-2">
                  {formik.errors.name}
                </span>
              ) : null}
            </div>
            <div className="user_box">
              <div className="wrap_input-form position-relative">
                <i className="fa-regular fa-envelope"></i>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <span className="text-danger text-register d-block mb-2">
                  {formik.errors.email}
                </span>
              ) : null}
            </div>
            <div className="user_box">
              <div className="wrap_input-form position-relative">
                <i className="fa-solid fa-phone-flip"></i>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                />
              </div>
              {formik.touched.phone && formik.errors.phone ? (
                <span className="text-danger text-register d-block mb-2">
                  {formik.errors.phone}
                </span>
              ) : null}
            </div>
            <div className="user_box">
              <div className="wrap_input-form position-relative">
                <i className="fa-solid fa-lock"></i>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                  name="passWord"
                  placeholder="Password"
                />
              </div>
              {formik.touched.passWord && formik.errors.passWord ? (
                <span className="text-danger text-register d-block mb-2 ">
                  {formik.errors.passWord}
                </span>
              ) : null}
            </div>
            <button type="submit" className="btn btn_primary mt-3">
              Submit
            </button>
            <div className="login_another">
              <span>
                Already have an account?
                <span className="login_now"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Login Now
                </span>
              </span>
              <div className="mt-3 text-center login_icon">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-twitter"></i>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
