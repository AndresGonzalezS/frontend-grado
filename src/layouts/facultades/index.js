import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Bar, Line, Pie, Radar, PolarArea, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

function Facultades() {
  const [dataFacultades, setDataFacultades] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchFacultadesData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/master/porcentajeDesercion/facultades", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setDataFacultades(response.data.desertores_por_facultad);
          prepareChartData(response.data.desertores_por_facultad);
        }
      } catch (error) {
        console.error("Error al obtener los datos de desertores por facultad:", error);
      }
    };
    fetchFacultadesData();
  }, []);

  const prepareChartData = (data) => {
    if (!data || data.length === 0) {
      console.warn("No hay datos disponibles para preparar el gráfico.");
      return;
    }

    const labels = data.map((row) => row.facultad);
    const desertores = data.map((row) => row.cantidad_estudiantes_desertores);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Cantidad de Estudiantes Desertores",
          data: desertores,
          backgroundColor: "rgba(75, 192, 192, 0.6)", // Color para Bar
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  const getColor = (index) => {
    const colors = [
      "rgba(75, 192, 192, 0.6)",
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
    ];
    return colors[index % colors.length];
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MDBox mb={3}>
              <h3>Gráfica de Barras</h3>
              <Bar
                data={{
                  labels: chartData.labels,
                  datasets: [
                    {
                      ...chartData.datasets[0],
                      backgroundColor: getColor(0),
                      borderColor: getColor(0).replace("0.6", "1"),
                    },
                  ],
                }}
                options={{ responsive: true }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <MDBox mb={3}>
              <h3>Gráfica de Líneas</h3>
              <Line
                data={{
                  labels: chartData.labels,
                  datasets: [
                    {
                      ...chartData.datasets[0],
                      backgroundColor: getColor(1),
                      borderColor: getColor(1).replace("0.6", "1"),
                    },
                  ],
                }}
                options={{ responsive: true }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <MDBox mb={3}>
              <h3>Gráfica de Pastel</h3>
              <Pie
                data={{
                  labels: chartData.labels,
                  datasets: [
                    {
                      ...chartData.datasets[0],
                      backgroundColor: chartData.labels.map((_, index) => getColor(index)),
                    },
                  ],
                }}
                options={{ responsive: true }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <MDBox mb={3}>
              <h3>Gráfica de Radar</h3>
              <Radar
                data={{
                  labels: chartData.labels,
                  datasets: [
                    {
                      ...chartData.datasets[0],
                      backgroundColor: getColor(3),
                      borderColor: getColor(3).replace("0.6", "1"),
                    },
                  ],
                }}
                options={{ responsive: true }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <MDBox mb={3}>
              <h3>Gráfica de Área Polar</h3>
              <PolarArea
                data={{
                  labels: chartData.labels,
                  datasets: [
                    {
                      ...chartData.datasets[0],
                      backgroundColor: chartData.labels.map((_, index) => getColor(index)),
                    },
                  ],
                }}
                options={{ responsive: true }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <MDBox mb={3}>
              <h3>Gráfica de Dona</h3>
              <Doughnut
                data={{
                  labels: chartData.labels,
                  datasets: [
                    {
                      ...chartData.datasets[0],
                      backgroundColor: chartData.labels.map((_, index) => getColor(index)),
                    },
                  ],
                }}
                options={{ responsive: true }}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Facultades;
