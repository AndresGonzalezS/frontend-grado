import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Notifications() {
  const [snackbars, setSnackbars] = useState({
    success: false,
    info: false,
    warning: false,
    error: false,
  });
  const openSnackbar = (type) => setSnackbars((prev) => ({ ...prev, [type]: true }));
  const closeSnackbar = (type) => setSnackbars((prev) => ({ ...prev, [type]: false }));

  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      Una alerta {name} simple con{" "}
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        un enlace de ejemplo
      </MDTypography>
      . Haz clic si lo deseas.
    </MDTypography>
  );

  const renderSnackbar = (type, color, icon, title, content) => (
    <MDSnackbar
      color={color}
      icon={icon}
      title={title}
      content={content}
      dateTime="Hace 11 minutos"
      open={snackbars[type]}
      onClose={() => closeSnackbar(type)}
      close={() => closeSnackbar(type)}
      bgWhite={color === "success" || color === "warning" || color === "error"}
    />
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Alertas</MDTypography>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h5">Notificaciones</MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  Opciones que puedes usar para notificaciones
                </MDTypography>
              </MDBox>
              <MDBox p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton
                      variant="gradient"
                      color="success"
                      onClick={() => openSnackbar("success")}
                      fullWidth
                    >
                      Notificación de Éxito
                    </MDButton>
                    {renderSnackbar(
                      "success",
                      "success",
                      "check",
                      "Éxito",
                      "Esta es una notificación de éxito"
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      onClick={() => openSnackbar("info")}
                      fullWidth
                    >
                      Notificación de Información
                    </MDButton>
                    {renderSnackbar(
                      "info",
                      "info",
                      "notifications",
                      "Información",
                      "Esta es una notificación de información"
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton
                      variant="gradient"
                      color="warning"
                      onClick={() => openSnackbar("warning")}
                      fullWidth
                    >
                      Notificación de Advertencia
                    </MDButton>
                    {renderSnackbar(
                      "warning",
                      "warning",
                      "star",
                      "Advertencia",
                      "Esta es una notificación de advertencia"
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton
                      variant="gradient"
                      color="error"
                      onClick={() => openSnackbar("error")}
                      fullWidth
                    >
                      Notificación de Error
                    </MDButton>
                    {renderSnackbar(
                      "error",
                      "error",
                      "warning",
                      "Error",
                      "Esta es una notificación de error"
                    )}
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Notifications;
