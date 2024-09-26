import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const { sales, tasks, desertores, generoDesercion, desertoresPadre, desertoresSisben } =
    reportsLineChartData;

  const [data, setData] = useState(reportsLineChartData);
  const [dataGenero, setGeneroData] = useState(reportsLineChartData);
  const [padreData, setPadreData] = useState(reportsLineChartData);
  const [sisbenData, setSisbenData] = useState(reportsLineChartData);
  const [etnia, setEtniaData] = useState(reportsLineChartData);

  useEffect(() => {
    const fetchDesertoresData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/master/porcentajeDesercion/madre", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          const labels = response.data.desertores_por_nivel_educativo_madre.map(
            (item) => item.nivel_edu_madre
          );
          const dataValues = response.data.desertores_por_nivel_educativo_madre.map(
            (item) => item.cantidad_estudiantes_desertores
          );
          setData({
            desertores: {
              labels,
              datasets: {
                label: "Cantidad de estudiantes desertores",
                data: dataValues,
              },
            },
          });
        }
      } catch (error) {
        console.error("Error al obtener los datos de desertores:", error);
      }
    };
    fetchDesertoresData();
  }, []);

  useEffect(() => {
    const fetchGeneroData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/master/porcentajeDesercion/genero", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          const labels = response.data.desertores_por_genero.map((item) => item.genero);
          const dataValues = response.data.desertores_por_genero.map(
            (item) => item.cantidad_estudiantes
          );
          setGeneroData({
            generoDesercion: {
              labels,
              datasets: {
                label: "Cantidad de estudiantes desertores",
                data: dataValues,
              },
            },
          });
        }
      } catch (error) {
        console.error("Error al obtener los datos de género:", error);
      }
    };
    fetchGeneroData();
  }, []);
  // Desertores por nivel educativo del padre
  useEffect(() => {
    const fetchPadreData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/master/porcentajeDesercion/padre", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          const labels = response.data.desertores_por_nivel_educativo_padre.map(
            (item) => item.nivel_edu_padre
          );
          const dataValues = response.data.desertores_por_nivel_educativo_padre.map(
            (item) => item.cantidad_estudiantes_desertores
          );
          setPadreData({
            desertoresPadre: {
              labels,
              datasets: {
                label: "Cantidad de estudiantes desertores",
                data: dataValues,
              },
            },
          });
        }
      } catch (error) {
        console.error("Error al obtener los datos de nivel educativo del padre:", error);
      }
    };
    fetchPadreData();
  }, []);
  // Fetch data for "Desertores por SISBEN"
  useEffect(() => {
    const fetchSisbenData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/master/porcentajeDesercion/sisben", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          const labels = response.data.desertores_por_sisben.map((item) => item.sisben);
          const dataValues = response.data.desertores_por_sisben.map(
            (item) => item.cantidad_estudiantes_desertores
          );
          setSisbenData({
            desertoresSisben: {
              labels,
              datasets: {
                label: "Cantidad de estudiantes desertores",
                data: dataValues,
              },
            },
          });
        }
      } catch (error) {
        console.error("Error al obtener los datos de SISBEN:", error);
      }
    };
    fetchSisbenData();
  }, []);

  useEffect(() => {
    const fetchEtniaData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/master/porcentajeDesercion/etnia", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          const etniaData = response.data.desertores_por_etnia;

          // Dividir los datos en dos partes
          const midpoint = Math.ceil(etniaData.length / 2);
          const firstPart = etniaData.slice(0, midpoint);
          const secondPart = etniaData.slice(midpoint);

          // Preparar etiquetas y valores para la primera parte
          const labelsFirstPart = firstPart.map((item) => item.grupo_etnico);
          const dataValuesFirstPart = firstPart.map((item) => item.cantidad_estudiantes_desertores);

          // Preparar etiquetas y valores para la segunda parte
          const labelsSecondPart = secondPart.map((item) => item.grupo_etnico);
          const dataValuesSecondPart = secondPart.map(
            (item) => item.cantidad_estudiantes_desertores
          );
          // Actualizar los estados con los dos conjuntos de datos
          setEtniaData({
            etniaDesercionPart1: {
              labels: labelsFirstPart,
              datasets: {
                label: "Cantidad de estudiantes desertores",
                data: dataValuesFirstPart,
              },
            },
            etniaDesercionPart2: {
              labels: labelsSecondPart,
              datasets: {
                label: "Cantidad de estudiantes desertores",
                data: dataValuesSecondPart,
              },
            },
          });
        }
      } catch (error) {
        console.error("Error al obtener los datos de etnia:", error);
      }
    };
    fetchEtniaData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {/* Aquí puedes usar barChartData en ReportsBarChart */}
          <Grid item xs={12} md={6} lg={14}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="info"
                title="Deserción por Nivel Educativo de la Madre"
                description="Cantidad de estudiantes desertores por nivel educativo de la madre"
                date="Tiempo de actualización de los datos"
                chart={data.desertores}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox py={3}>
        <Grid container spacing={3}>
          {["Teología", "Ingeniería", "Salud", "Licenciatura"].map((title, index) => (
            <Grid item xs={12} md={6} lg={14} key={index}>
              <MDBox mb={1.5}>
                <MDBox
                  color="dark"
                  icon="leaderboard"
                  title={title}
                  count={"NUMERO DE ESTUDIANTES"}
                  percentage={{
                    color: "success",
                    amount: "55%",
                    label: "Deserción",
                  }}
                />
              </MDBox>
            </Grid>
          ))}
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={14}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Sisben"
                  description="Deserción por grupo de Sisben"
                  date="Tiempo de actualización de los datos"
                  chart={sisbenData.desertoresSisben}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={14}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Género"
                  description="Deserción total por género"
                  date="Tiempo de actualización de los datos"
                  chart={dataGenero.generoDesercion}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={14}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Educación Padre"
                  description="Deserción total por nivel educativo del Padre"
                  date="Tiempo de actualización de los datos"
                  chart={padreData.desertoresPadre}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={14}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Etnia Parte 1"
                  description="Deserción total por etnia 1 Parte"
                  date="Tiempo de actualización de los datos"
                  chart={etnia.etniaDesercionPart1}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={14}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Etnia Parte 2"
                  description="Deserción total por etnia 2 Parte"
                  date="Tiempo de actualización de los datos"
                  chart={etnia.etniaDesercionPart2}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
