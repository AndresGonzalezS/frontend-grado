import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function OrdersOverview() {
  const data = {
    labels: ["Deserción: Sí", "Deserción: No"],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#FF6384", "#36A2EB"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <MDBox sx={{ height: "100%", border: "1px solid #ddd", borderRadius: 2 }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Deserción Estudiantil
        </MDTypography>
      </MDBox>
      <MDBox p={2} display="flex" justifyContent="center" alignItems="center">
        <Pie data={data} />
      </MDBox>
    </MDBox>
  );
}

export default OrdersOverview;
