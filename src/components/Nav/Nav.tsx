import "./Nav.css";
import logo from "../../assets/link.png";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tokenAtom } from "../../stateAtoms";

const Nav = () => {
  const [token, setToken] = useRecoilState(tokenAtom);

  return (
    <div className="Nav">
      <div className="navContainer">
        <img src={logo} className="navItem logo" />
        <Link className="link" to={"/"}>
          <h1 className="navItem">SoloLink</h1>
        </Link>
      </div>

      {!token && (
        <div className="navContainer">
          <Link className="link" to={"/Register"}>
            <a className="navItem">Register</a>
          </Link>
          <Link className="link" to={"/Login"}>
            <a className="navItem">Login</a>
          </Link>
        </div>
      )}

      {token && (
        <div className="navContainer">
          <Link className="link" to={"/Dashboard"}>
            <a className="navItem">Dashboard</a>
          </Link>
          <Link className="link" to={"/Login"}>
            <a
              className="navItem"
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
