import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";
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
          {!token && ( // not logged in routes
            <>
              <Route path="/Login" element={<Login />} />
            </>
          )}
          {token && ( // logged in only routes
            <>
              <Route path="/Dashboard" element={<Dashboard />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
