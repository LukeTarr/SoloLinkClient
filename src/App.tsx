import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Nav from "./components/Nav/Nav";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
