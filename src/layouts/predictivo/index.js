import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
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
} from "@mui/material";

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

        if (responseEstudiantes.data.success) {
          setData(responseEstudiantes.data.data);
        }

        const responseModelo = await axios.get("/master/entrenar_modelo2/esudiantes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (responseModelo.data.success) {
          setModelStats(responseModelo.data);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.carnet.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
