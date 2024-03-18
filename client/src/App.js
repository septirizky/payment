import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Component/layout";
import User from "./Component/user";
import { Login } from "./Component/login";
import { Register } from "./Component/register";
import Transaksi from "./Component/transaksi";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/users" element={<Layout />}>
            <Route index element={<User />} />
            <Route path="/users/transaksi" index element={<Transaksi />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
