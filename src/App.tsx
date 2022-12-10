import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Home from "./components/Pages//Home/Home";
import Login from "./components/Pages//Login/Login";
import Nav from "./components/Pages//Nav/Nav";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Profile from "./components/Pages/Profile/Profile";
import Register from "./components/Pages/Register/Register";
import Studio from "./components/Pages/Studio/Studio";
import { tokenAtom } from "./stateAtoms";

const App = () => {
  const queryClient = new QueryClient();
  const token = useRecoilValue(tokenAtom);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/Profile/:username" element={<Profile />} />
          {!token && ( // not logged in routes
            <>
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
            </>
          )}
          {token && ( // logged in only routes
            <>
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Studio" element={<Studio />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
