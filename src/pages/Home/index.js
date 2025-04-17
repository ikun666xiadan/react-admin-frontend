import "./index.css";
import VideoEcharts from "./VideoEcharts";
import TableList from "./TableList/inedx";
import UserInfo from "./UserInfo";
import UserEcharts from "./UserDataEcharts";

function Home() {
  return (
    <div className="home">
      <div className="content">
        <UserInfo/>
        <VideoEcharts/>
      </div>
      <div className="content">
        <TableList/>
        <UserEcharts/>
      </div>
    </div>
  );
}

export default Home;
