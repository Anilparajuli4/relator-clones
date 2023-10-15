import { Navigate, Outlet } from "react-router-dom";
import { UserAuthStatus } from "../Hooks/UserAuthStatus";

function PrivateRoute() {
  const { loggedIn, checkingStatus } = UserAuthStatus();
  if (checkingStatus) {
    return <h1>loading</h1>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
