import { Outlet } from "react-router-dom";

function Layout() {
    return (
      <div className="Layout">
        Layout
        <Outlet></Outlet>
      </div>
    );
  }
  
export default Layout;
  