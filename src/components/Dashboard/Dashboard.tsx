import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../stateAtoms";

const Dashboard = () => {
  const token = useRecoilValue(tokenAtom);

  return <div>{token}</div>;
};

export default Dashboard;
