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

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          {["Teología", "Ingeniería", "Salud", "Licenciatura"].map((title, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
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
            <Grid item xs={12} md={6} lg={4}>
              <ReportsLineChart
                color="info"
                title="Género"
                description="Deserción total por género"
                date="Tiempo de actualización de los datos"
                chart={tasks}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3} sx={{ height: "32.5rem" }}>
                <ReportsLineChart
                  color="info"
                  title="Año"
                  description="Deserción total del año pasado"
                  date="Tiempo de actualización de los datos"
                  chart={sales}
                  height={500}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Total"
                  description="Deserción total de todos los años"
                  date="Tiempo de actualización de los datos"
                  chart={reportsBarChartData}
                  height={500}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Educación de la madre"
                  description="Deserción total por género"
                  date="Tiempo de actualización de los datos"
                  chart={tasks}
                  height={500}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Educación del padre"
                  description="Deserción total por género"
                  date="Tiempo de actualización de los datos"
                  chart={tasks}
                  height={500}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Sisben"
                  description="Deserción total por género"
                  date="Tiempo de actualización de los datos"
                  chart={tasks}
                  height={500}
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
