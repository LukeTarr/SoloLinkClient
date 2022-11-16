import logo from "../../../assets/link.png";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tokenAtom } from "../../../stateAtoms";

const Nav = () => {
  const [token, setToken] = useRecoilState(tokenAtom);

  return (
    <div className="h-16 p-8 flex justify-between items-center bg-blue-900 text-white ">
      <div className="flex items-center">
        <img src={logo} className="m-2 max-w-14 max-h-14" />
        <Link className="link" to={"/"}>
          <h1 className="m-2 text-2xl hover:text-black">SoloLink</h1>
        </Link>
      </div>

      {!token && (
        <div className="flex items-center">
          <Link className="link" to={"/Register"}>
            <a className="m-2 hover:text-black">Register</a>
          </Link>
          <Link className="link" to={"/Login"}>
            <a className="m-2 hover:text-black">Login</a>
          </Link>
        </div>
      )}

      {token && (
        <div className="navContainer">
          <Link className="link" to={"/Dashboard"}>
            <a className="m-2 hover:text-black">Dashboard</a>
          </Link>
          <Link className="link" to={"/Login"}>
            <a
              className="m-2 hover:text-black"
              onClick={() => {
                setToken("");
              }}
            >
              Logout
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
