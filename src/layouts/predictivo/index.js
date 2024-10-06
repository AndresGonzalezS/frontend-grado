import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MDButton from "components/MDButton";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 500,
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const IntroductionBox = styled(MDBox)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: 8,
  marginBottom: theme.spacing(2),
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
}));

function Predictivo() {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery) {
      setError("Por favor ingresa un carnet.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/master/predecir_desercion2/?carnet=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error al obtener la predicción:", error);
      setError("No se pudo obtener la predicción. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Nueva función para manejar la tecla "Enter"
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <IntroductionBox>
              <Typography variant="h6" component="h2" gutterBottom>
                Modo Predictivo de la UNAC
              </Typography>
              <Typography variant="body1">
                Este es el modo predictivo, donde puedes ingresar el carnet del estudiante que
                deseas analizar y, posteriormente, pulsar el botón &quot;Predecir Deserción&quot;
                para generar los datos de predicción.
              </Typography>
            </IntroductionBox>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Buscar estudiante (Carnet)"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown} // Agregar el manejador de teclas aquí
            />
          </Grid>
          <Grid item xs={12}>
            <MDButton
              variant="gradient"
              disabled={loading}
              color="info"
              fullWidth
              onClick={handleSearch}
            >
              {loading ? "Cargando..." : "Predecir Deserción"}
            </MDButton>
          </Grid>
          <Grid item xs={12}>
            {error && <Typography color="error">{error}</Typography>}
          </Grid>
          {loading && (
            <Grid item xs={12}>
              <Typography>Cargando datos...</Typography>
            </Grid>
          )}
          {data && (
            <Grid item xs={12}>
              <StyledTableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Variable</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <StyledTableCell>Carnet</StyledTableCell>
                      <StyledTableCell>{data.carnet}</StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Deserta</StyledTableCell>
                      <StyledTableCell>{data.deserta ? "Sí" : "No"}</StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Probabilidad de Deserción</StyledTableCell>
                      <StyledTableCell>{data.probabilidad_desercion}</StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Género</StyledTableCell>
                      <StyledTableCell>{data.variables_influyentes.GENERO}</StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Matemáticas</StyledTableCell>
                      <StyledTableCell>{data.variables_influyentes.MAT}</StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Prog</StyledTableCell>
                      <StyledTableCell>{data.variables_influyentes.PROG}</StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Promedio General</StyledTableCell>
                      <StyledTableCell>
                        {data.variables_influyentes.PROMEDIO_GENERAL}
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>Religión</StyledTableCell>
                      <StyledTableCell>{data.variables_influyentes.RELG}</StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell>SISBEN</StyledTableCell>
                      <StyledTableCell>{data.variables_influyentes.SISBEN}</StyledTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </StyledTableContainer>
            </Grid>
          )}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Predictivo;
