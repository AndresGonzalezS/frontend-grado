import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

ChartJS.register(...registerables);

function Facultades() {
  const [dataFacultades, setDataFacultades] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [selectedFacultad, setSelectedFacultad] = useState(null);
  const [topDatos, setTopDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacultadesData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/master/porcentajeDesercion/facultades", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setDataFacultades(response.data.desertores_por_facultad);
          prepareChartData(response.data.desertores_por_facultad);
        }
      } catch (error) {
        console.error("Error al obtener los datos de desertores por facultad:", error);
        setError("No se pudieron cargar los datos. Intenta nuevamente más tarde.");
      } finally {
        setLoading(false);
      }
    };

    const fetchTopEstudiantesData = async () => {
      try {
        const responses = await Promise.all([
          axios.get("/master/top/General"),
          axios.get("/master/top/FacultadAdministrativas"),
          axios.get("/master/top/FacultadTeologia"),
          axios.get("/master/top/FacultadIngeniera"),
          axios.get("/master/top/FacultadCienciasSalud"),
          axios.get("/master/top/FacultadHumanasEducacion"),
        ]);
      } catch (error) {
        console.error("Error al obtener los datos del top de estudiantes:", error);
      }
    };

    fetchFacultadesData();
    fetchTopEstudiantesData();
  }, []);

  const prepareChartData = (data) => {
    if (!data || data.length === 0) return;

    const labels = data.map((row) => row.facultad);
    const desertores = data.map((row) => row.cantidad_estudiantes_desertores);
    const colors = [
      "rgba(75, 192, 192, 0.6)",
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
    ];

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Cantidad de Estudiantes Desertores",
          data: desertores,
          backgroundColor: colors.slice(0, desertores.length),
          borderWidth: 1,
        },
      ],
    });
  };

  const handleBarClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const facultadSeleccionada = chartData.labels[index];
      setSelectedFacultad(facultadSeleccionada);
      fetchTopEstudiantes(facultadSeleccionada);
    }
  };

  const fetchTopEstudiantes = async (facultad) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/master/topEstudiantes/${facultad}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setTopDatos(response.data.topEstudiantes);
      } else {
        setTopDatos([]);
      }
    } catch (error) {
      console.error("Error al obtener los datos del top de estudiantes:", error);
      setTopDatos([]);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <MDBox mb={3}>
              <h3>Gráfica de Barras</h3>
              {loading ? (
                <MDBox display="flex" justifyContent="center" alignItems="center" height="400px">
                  <CircularProgress />
                </MDBox>
              ) : error ? (
                <MDBox my={2}>
                  <Alert severity="error">{error}</Alert>
                </MDBox>
              ) : (
                <div style={{ height: "400px", position: "relative" }}>
                  <Bar
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          callbacks: {
                            label: function (tooltipItem) {
                              return tooltipItem.label + ": " + tooltipItem.raw;
                            },
                          },
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: function (value) {
                              return value;
                            },
                          },
                        },
                        x: {
                          ticks: { display: false },
                        },
                      },
                    }}
                    height={400}
                  />
                </div>
              )}
            </MDBox>

            <MDBox display="flex" justifyContent="space-between" mt={2}>
              {chartData.labels.map((label, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      backgroundColor: chartData.datasets[0].backgroundColor[index],
                      width: "20px",
                      height: "20px",
                      borderRadius: "3px",
                      marginRight: "8px",
                    }}
                  ></div>
                  <span style={{ fontSize: "12px" }}>{label}</span>
                </div>
              ))}
            </MDBox>

            {selectedFacultad && (
              <MDBox mt={4}>
                <h4>Top por {selectedFacultad}</h4>
                {topDatos.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Nombre</TableCell>
                          <TableCell align="right">Carnet</TableCell>
                          <TableCell align="right">Probabilidad de deserción</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {topDatos.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell align="right">{item.carnet}</TableCell>
                            <TableCell align="right">{item.probabilidad_desercion}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Alert severity="info">No carga los datos.</Alert>
                )}
              </MDBox>
            )}
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Facultades;
