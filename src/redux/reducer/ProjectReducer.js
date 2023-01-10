import { token, USER_LOGIN } from "../../utils/setting";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrListProject: [],
  arrListCategoryProject: [],
};
export const ProjectReducer = createSlice({
  name: "ProjectReducer",
  initialState,
  reducers: {
    getAllProject: (state, action) => {
      state.arrListProject = action.payload;
    },
    getCategoryProject: (state, action) => {
      state.arrListCategoryProject = action.payload;
    },
  },
});
//truyền action
export const { getAllProject, getCategoryProject } = ProjectReducer.actions;
export default ProjectReducer.reducer;
