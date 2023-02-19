import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../views/layout";
import SignIn from "../views/pages/auth/signIn";
import SignUp from "../views/pages/auth/signUp";
import Home from "../views/pages/home";

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/auth/signIn" element={<SignIn />} />
          <Route path="/auth/signUp" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
