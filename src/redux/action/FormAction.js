import { toast } from "react-toastify";
import { bothServiceToken } from "../../services/BothTokenService";
import { token, USER_LOGIN } from "../../utils/setting";
import { loginForm } from "../reducer/FormReducer";

export const loginAPI = (userInfo, navigate) => {
  return (dispatch2) => {
    let promise = bothServiceToken.post("Users/signin", userInfo);
    promise.then((result) => {
      toast.success("Login successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      console.log(result.data.content);

      let curUser = result.data.content;
      let getToken = JSON.stringify(result.data.content.accessToken);
      localStorage.setItem(token, getToken);
      let userInfo = JSON.stringify(curUser);
      localStorage.setItem(USER_LOGIN, userInfo);
      //
      navigate("/getallproject");
      dispatch2(loginForm(curUser));
    });
    promise.catch((error) => {
      toast.error(`Login failed! ${error.response?.data.content}`, {
        position: "top-right",
        autoClose: 3000,
      });
    });
  };
};

export const registerAPI = (userInfo, navigate) => {
  return (dispatch2) => {
    let promise = bothServiceToken.post("Users/signup", userInfo);
    promise.then((result) => {
      toast.success("Register successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/");
    });
    promise.catch((error) => {
      toast.error("Username or email is existed!", {
        position: "top-right",
        autoClose: 3000,
      });
      console.log(error.response?.data);
    });
  };
};
