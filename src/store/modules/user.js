import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "../../apis/userInfo";

const userStore = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.userInfo = {};
    },
  },
});

const { setUserInfo, clearUserInfo } = userStore.actions;

const getUsersInfo = () => {
  return async (dispatch) => {
    const res = await getUserInfo();
    dispatch(setUserInfo(res));
  };
};

const userReduce = userStore.reducer;

export { getUsersInfo, clearUserInfo };

export default userReduce;
