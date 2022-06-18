import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import "./home.css";


const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
            <h1>Widget one</h1>
        </div>
        <div className="charts">
        <h1>Featured</h1>
          
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <h1>Tables</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
