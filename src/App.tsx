import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Home from "./components/Pages//Home/Home";
import Login from "./components/Pages//Login/Login";
import Nav from "./components/Pages//Nav/Nav";
import Page from "./components/Pages//Page/Page";
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
              <Route path="/Page" element={<Page />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
