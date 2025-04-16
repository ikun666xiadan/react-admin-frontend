import "./index.css";
import TableList from "./TableList/inedx";
import UserInfo from "./UserInfo";

function Home() {
  return (
    <div className="home">
      <UserInfo/>
      <TableList/>
    </div>
  );
}

export default Home;
