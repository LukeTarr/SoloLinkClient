import "./Dashboard.css";
import { CgProfile, CgFeed, CgInsights } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashContainer">
      <div className="dashCard">
        <CgProfile className="icon" />
        <h3 className="dashText">Account</h3>
        <h5 className="dashText">Make edits to your account settings.</h5>
      </div>
      <div
        className="dashCard"
        onClick={() => {
          navigate("/Page");
        }}
      >
        <CgFeed className="icon" />
        <h3 className="dashText">Page</h3>
        <h5 className="dashText">Studio to edit your public page.</h5>
      </div>

      <div className="dashCard">
        <CgInsights className="icon" />
        <h3 className="dashText">Analytics</h3>
        <h5 className="dashText">View the analytics of your public page.</h5>
      </div>
    </div>
  );
};

export default Dashboard;
