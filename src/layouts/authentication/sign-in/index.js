import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import axios from "axios";

const bgImage = "/images/img2.png";
const img1 = "/images/img5.png";

function Basic({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    try {
      const response = await axios.post("/master/auth/", {
        USUARIO_ACCESO: username,
        CLAVE_ACCESO: password,
      });

      if (response.status === 200 && response.data.success) {
        console.log("Login successful");
        const token = response.data.token;
        console.log("Token recibido:", token);
        localStorage.setItem("token", token);
        navigate("/dashboard");
        onLoginSuccess();
      } else {
        setError("Usuario o contraseña inválidos");
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      setError(error.response.data.message || "Error en la autenticación. Intenta de nuevo.");
    } else if (error.request) {
      setError("No se recibió respuesta del servidor. Verifica tu conexión.");
    } else {
      console.error("Error:", error.message);
      setError("Error en la solicitud.");
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="success"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDBox component="img" src={img1} alt="Sign in" sx={{ width: "50%", height: "auto" }} />
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Usuario"
                fullWidth
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  console.log("Username:", e.target.value);
                }}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Contraseña"
                fullWidth
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log("Password:", e.target.value);
                }}
              />
            </MDBox>
            {error && (
              <MDBox mb={2}>
                <MDTypography variant="body2" color="error">
                  {error}
                </MDTypography>
              </MDBox>
            )}
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="success" fullWidth>
                Ingresar
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

Basic.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default Basic;
