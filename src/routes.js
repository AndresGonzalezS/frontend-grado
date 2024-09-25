import Dashboard from "layouts/dashboard";
import Notifications from "layouts/notifications";
import SignIn from "layouts/authentication/sign-in";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";

// Esta función se utilizará para manejar el éxito en el inicio de sesión
function handleLoginSuccess() {
  const navigate = useNavigate();
  navigate("/dashboard");
}

const routes = [
  {
    type: "collapse",
    name: "Descriptivo",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Predictivo",
    key: "Predictivo",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Facultades",
    key: "Facultades",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
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
    // Aquí le pasamos la función onLoginSuccess al componente SignIn
    component: <SignIn onLoginSuccess={handleLoginSuccess} />,
  },
];

export default routes;
