import Dashboard from "layouts/dashboard";
import Notifications from "layouts/notifications";
import SignIn from "layouts/authentication/sign-in";
import Facultades from "layouts/facultades";
import Predictivo from "layouts/predictivo";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";

function handleLoginSuccess() {
  const navigate = useNavigate();
  navigate("/dashboard");
}

const routes = [
  {
    type: "collapse",
    name: "Descriptivo",
    key: "dashboard",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Predictivo",
    key: "predictivo",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/predictivo",
    component: <Predictivo />,
  },
  {
    type: "collapse",
    name: "Facultades",
    key: "facultades",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/facultades",
    component: <Facultades />,
  },
  {
    type: "collapse",
    name: "Alertas",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Log off",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn onLoginSuccess={handleLoginSuccess} />,
  },
];

export default routes;
