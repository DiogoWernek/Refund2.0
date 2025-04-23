import { Routes, Route } from "react-router";

import { AuthLayout } from "../components/AuthLayout";

import { SingIn } from "../pages/SignIn";
import { SingUp } from "../pages/SignUp";
import { NotFound } from "../pages/NotFound";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<SingIn />} />
        <Route path="/signup" element={<SingUp />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
