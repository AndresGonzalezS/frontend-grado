import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Box from "@mui/material/Box";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useEffect, useState } from "react";
import axios from "axios";
import VerticalBarChart from "./data/VerticalBarChart";
import PieChart from "examples/Charts/PieChart";
function Dashboard() {
  const {
    sales,
    tasks,
    desertores,
    generoDesercion,
    desertoresPadre,
    desertoresSisben,
    desertoresPaises,
  } = reportsLineChartData;

  const [data, setData] = useState(reportsLineChartData);
  const [dataGenero, setGeneroData] = useState(reportsLineChartData);
  const [padreData, setPadreData] = useState(reportsLineChartData);
  const [sisbenData, setSisbenData] = useState(reportsLineChartData);
  const [etnia, setEtniaData] = useState(reportsLineChartData);
  const [desertoresPais, setDesertoresPais] = useState(reportsLineChartData);
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

          const midpoint = Math.ceil(etniaData.length / 2);
          const firstPart = etniaData.slice(0, midpoint);
          const secondPart = etniaData.slice(midpoint);

          const labelsFirstPart = firstPart.map((item) => item.grupo_etnico);
          const dataValuesFirstPart = firstPart.map((item) => item.cantidad_estudiantes_desertores);

          const labelsSecondPart = secondPart.map((item) => item.grupo_etnico);
          const dataValuesSecondPart = secondPart.map(
            (item) => item.cantidad_estudiantes_desertores
          );

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
  useEffect(() => {
    const fetchDesertoresPais = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/master/porcentajeDesercion/pais", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          const labels = response.data.desertores_por_pais.map((item) => item.pais);
          const dataValues = response.data.desertores_por_pais.map(
            (item) => item.cantidad_estudiantes_desertores
          );
          setDesertoresPais({
            desertoresPaises: {
              labels,
              datasets: {
                label: "Cantidad de estudiantes desertores",
                data: dataValues,
              },
            },
          });
        }
      } catch (error) {
        console.error("Error al obtener los datos de deserción por país:", error);
      }
    };
    fetchDesertoresPais();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={1}>
        <MDBox py={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={12}>
              <MDBox mb={3} mt={2}>
                <ReportsLineChart
                  color="info"
                  title="Deserción por Nivel Educativo de la Madre"
                  description="La mayoría de los desertores proviene de familias sin información sobre el nivel educativo de la madre. También hay un alto número con madres de educación básica primaria. Esto sugiere que la falta de educación materna se relaciona con un mayor riesgo de deserción."
                  date="Datos actualizados hasta el 2024-1"
                  chart={data.desertores}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <MDBox mb={3} mt={2}>
                <ReportsLineChart
                  color="info"
                  title="Sisben"
                  description="La mayoría de los desertores proviene de familias con clasificación [NO APLICA] en el Sisbén. Los grupos más afectados son Grupo A y Grupo B, indicando que las familias en condiciones vulnerables enfrentan mayores riesgos de deserción."
                  date="Datos actualizados hasta el 2024-1"
                  chart={sisbenData.desertoresSisben}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <MDBox mb={3} mt={2}>
                <PieChart
                  color="info"
                  title="Género"
                  description="Deserción total por género"
                  date="Datos actualizados hasta el 2024-1"
                  chart={dataGenero.generoDesercion}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <MDBox mb={3} mt={2}>
                <ReportsLineChart
                  color="info"
                  title="Educación Padre"
                  description="La mayoría de los desertores proviene de familias sin información sobre el nivel educativo de los padres, lo que podría ser un factor de riesgo. También se observa que los padres con educación básica primaria están relacionados con más deserciones, mientras que niveles educativos más altos se asocian con menor deserción."
                  date="Datos actualizados hasta el 2024-1"
                  chart={padreData.desertoresPadre}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <MDBox mb={3} mt={2}>
                <ReportsLineChart
                  color="info"
                  title="Etnia Parte 1"
                  description="Deserción total por etnia 1 Parte"
                  date="Datos actualizados hasta el 2024-1"
                  chart={etnia.etniaDesercionPart1}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <MDBox mb={3} mt={2}>
                <ReportsLineChart
                  color="info"
                  title="Etnia Parte 2"
                  description="Deserción total por etnia 2 Parte"
                  date="Datos actualizados hasta el 2024-1"
                  chart={etnia.etniaDesercionPart2}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <MDBox mb={3} mt={2}>
                <ReportsLineChart
                  color="info"
                  title="Pais"
                  description="La mayoría de los desertores proviene de Colombia, mientras que un 3.1% no tiene país de origen especificado. Esto indica que la deserción está altamente concentrada en Colombia, sugiriendo problemas en su sistema educativo."
                  date="Datos actualizados hasta el 2024-1"
                  chart={desertoresPais.desertoresPaises}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
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
    </DashboardLayout>
  );
}

export default Dashboard;
