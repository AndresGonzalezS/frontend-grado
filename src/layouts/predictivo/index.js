import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
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
  const [data, setData] = useState([]);
  const [modelStats, setModelStats] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const responseEstudiantes = await axios.get("/master/entrenar_modelo2/", {
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={1}>
        <MDBox py={1}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Buscar estudiante (Carnet)"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearch}
              />
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Carnet</TableCell>
                      <TableCell>Deserta</TableCell>
                      <TableCell>Probabilidad de Deserción</TableCell>
                      <TableCell>Género</TableCell>
                      <TableCell>Matemáticas</TableCell>
                      <TableCell>Prog</TableCell>
                      <TableCell>Promedio General</TableCell>
                      <TableCell>Religión</TableCell>
                      <TableCell>SISBEN</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.carnet}</TableCell>
                          <TableCell>{item.deserta ? "Sí" : "No"}</TableCell>
                          <TableCell>{item.probabilidad_desercion}</TableCell>
                          <TableCell>{item.variables_influyentes.GENERO}</TableCell>
                          <TableCell>{item.variables_influyentes.MAT}</TableCell>
                          <TableCell>{item.variables_influyentes.PROG}</TableCell>
                          <TableCell>{item.variables_influyentes.PROMEDIO_GENERAL}</TableCell>
                          <TableCell>{item.variables_influyentes.RELG}</TableCell>
                          <TableCell>{item.variables_influyentes.SISBEN}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} align="center">
                          No se encontraron estudiantes.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              {modelStats && (
                <Paper style={{ padding: 16 }}>
                  <h2>Estadísticas del Modelo</h2>
                  <p>Precisión: {modelStats.accuracy * 100}%</p>
                  <h3>Matriz de Confusión</h3>
                  <Table>
                    <TableBody>
                      {modelStats.matriz_confusion.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {row.map((value, colIndex) => (
                            <TableCell key={colIndex}>{value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              )}
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Predictivo;
