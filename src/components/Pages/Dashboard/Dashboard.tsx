import { CgFeed, CgInsights, CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import DashCard from "../../DashCard/DashCard";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-6 md:mt-40 ">
      <DashCard
        component={() => {
          navigate("/Dashboard");
        }}
        icon={<CgProfile className="w-24 h-24" />}
        title={"Acount (Coming Soon)"}
        subtext={"Edit account settings"}
      />

      <DashCard
        component={() => {
          navigate("/Studio");
        }}
        icon={<CgFeed className="w-24 h-24" />}
        title={"Studio"}
        subtext={"Edit your public page"}
      />

      <DashCard
        component={() => {
          navigate("/Dashboard");
        }}
        icon={<CgInsights className="w-24 h-24" />}
        title={"Analytics (Coming Soon)"}
        subtext={"View your page's analytics"}
      />
    </div>
  );
};

export default Dashboard;
