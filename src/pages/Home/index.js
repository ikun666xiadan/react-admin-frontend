import "./index.css";
import VideoEcharts from "./VideoEcharts";
import TableList from "./TableList/inedx";
import UserInfo from "./UserInfo";

function Home() {
  return (
    <div className="home">
      <div className="top_content">
        <UserInfo/>
        <VideoEcharts/>
      </div>
      <TableList/>
    </div>
  );
}

export default Home;
