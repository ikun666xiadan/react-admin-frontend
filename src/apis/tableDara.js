import { request } from "../utils";

const getTableData = () => {
  return request({
    url: "/tableData",
    method: "GET",
  });
};

export { getTableData };
