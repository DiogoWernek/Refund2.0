import { BrowserRouter } from "react-router";

import { Loading } from "../components/loading";

import { AuthRoutes } from "./AuthRoutes";
import { ManagerRoutes } from "./ManagerRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";

const isloading = false;

const session = {
  user: {
    role: "manager",
  }
}

export function Routes() {
  function Route() {
    switch (session?.user.role) {
      case "manager":
        return <ManagerRoutes />;
      case "employee":
        return <EmployeeRoutes />;
      default:
        return <AuthRoutes />;
    }
  }

  if (isloading) {
    return <Loading />
  }
  
  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}