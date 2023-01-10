import { wait } from "@testing-library/user-event/dist/utils";
import { toast } from "react-toastify";
import { bothServiceToken } from "../../services/BothTokenService";
import { closeSpinner, openSpinner } from "../reducer/Loading";
import { getAllProject, getCategoryProject } from "../reducer/ProjectReducer";

export const getListProjectAPI = () => {
  return async (dispatch) => {
    dispatch(openSpinner());
    await wait(800);
    try {
      const { data } = await bothServiceToken.get(`Project/getAllProject`);
      dispatch(getAllProject(data.content));
    } catch (error) {
      toast.error(error.response, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      dispatch(closeSpinner());
    }
  };
};

export const getCategoryProjectAPI = () => {
  return async (dispatch) => {
    dispatch(openSpinner());
    await wait(800);
    try {
      const { data } = await bothServiceToken.get(`ProjectCategory`);
      dispatch(getCategoryProject(data.content));
    } catch (error) {
      toast.error(error.response, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      dispatch(closeSpinner());
    }
  };
};
export const createProjectAPI = (project, navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.post(
        `Project/createProject`,
        project
      );
      getListProjectAPI();
      toast.success("Create Project Successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/projectall");
    } catch (error) {
      console.log(error,"error")
      toast.error(error.response, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
};
