import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Component/layout";
import User from "./Component/user";
import { Login } from "./Component/login";
import { Register } from "./Component/register";
import Transaksi from "./Component/transaksi";
import ProtectedRoutes from "./protectedRoute";
import Logout from "./Component/logout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoutes>
                  <Transaksi />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/profil"
              element={
                <ProtectedRoutes>
                  <User />
                </ProtectedRoutes>
              }
            />
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/Register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
