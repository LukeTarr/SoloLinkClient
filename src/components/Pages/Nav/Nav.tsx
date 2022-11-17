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
          <Link className="m-2 hover:text-black" to={"/Register"}>
            Register
          </Link>
          <Link className="m-2 hover:text-black" to={"/Login"}>
            Login
          </Link>
        </div>
      )}

      {token && (
        <div className="navContainer">
          <Link className="m-2 hover:text-black" to={"/Dashboard"}>
            Dashboard
          </Link>
          <Link
            className="m-2 hover:text-black"
            to={"/Login"}
            onClick={() => {
              setToken("");
            }}
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
