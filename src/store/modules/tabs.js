import { createSlice } from "@reduxjs/toolkit";

const tabStore = createSlice({
  name: "tabs",
  initialState: {
    collapsed: false,
  },
  reducers: {
    setCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
  },
});

const { setCollapsed } = tabStore.actions;

const tabReduce = tabStore.reducer;

export { setCollapsed };
export default tabReduce;
