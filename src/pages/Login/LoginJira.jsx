import React from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../redux/action/FormAction";
import { toast } from "react-toastify";
export default function LoginJira(props) {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email không được để trống")
        .email("Email không đúng định dạng"),
      passWord: Yup.string()
        .required("Mật khẩu không được để trống")
        .min(3, "Mật khẩu ít nhất có 3 kí tự."),
    }),
    onSubmit: (values) => {
      dispatch(loginAPI(values, navigate));
    },
  });
  const { handleSubmit } = formik;
  return (
    <div className="form_jira login_jira">
      <div className="row">
        <div className="col-7">
          <img
            src="https://www.dice.com/binaries/content/gallery/dice/insights/2019/01/Bootcamp-MOOC-Learning-Tech-Coding-Programming-Dice-1024x640.png"
            className="img-fluid"
            alt=""
          />
        </div>
        <div className="col-5">
          <h2>Login</h2>

          <form
            onSubmit={handleSubmit}
            className="container d-flex flex-column"
          >
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
                Don't have an account yet ?
                <span
                  className="login_now"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register Now
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
