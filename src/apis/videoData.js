import { request } from "../utils";

const getVideoData = () => {
  return request({
    url: "/videoData",
    method: "GET",
  });
};

export { getVideoData };
