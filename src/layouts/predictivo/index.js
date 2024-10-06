import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
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
} from "@mui/material";

function Predictivo() {
  const [data, setData] = useState(null);
  const [modelStats, setModelStats] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
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
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
                {loading ? "Cargando..." : "Predecir Deserción"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </Grid>
            {data && (
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
                      <TableRow>
                        <TableCell>{data.carnet}</TableCell>
                        <TableCell>{data.deserta ? "Sí" : "No"}</TableCell>
                        <TableCell>{data.probabilidad_desercion}</TableCell>
                        <TableCell>{data.variables_influyentes.GENERO}</TableCell>
                        <TableCell>{data.variables_influyentes.MAT}</TableCell>
                        <TableCell>{data.variables_influyentes.PROG}</TableCell>
                        <TableCell>{data.variables_influyentes.PROMEDIO_GENERAL}</TableCell>
                        <TableCell>{data.variables_influyentes.RELG}</TableCell>
                        <TableCell>{data.variables_influyentes.SISBEN}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Predictivo;
