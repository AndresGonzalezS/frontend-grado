import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

function OrdersOverview() {
  const [data, setData] = useState({
    labels: ["Deserción: Sí", "Deserción: No"],
    datasets: [
      {
        data: [1039, 1875],
        backgroundColor: ["#FF6384", "#36A2EB"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("/master/porcentajeDesercion/general", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (result.success) {
          // Convertir la cadena de deserción en un objeto
          const desercionData = JSON.parse(result.desercion.replace(/'/g, '"'));
          const cantidadEstudiantes = desercionData.cantidad_estudiantes;
          const porcentajeDesercion = parseFloat(desercionData.porcentaje_desercion);

          const desertoresCount = Math.round((porcentajeDesercion / 100) * cantidadEstudiantes);
          const noDesertoresCount = cantidadEstudiantes - desertoresCount;

          setData({
            labels: ["Deserción: Sí", "Deserción: No"],
            datasets: [
              {
                data: [desertoresCount, noDesertoresCount],
                backgroundColor: ["#FF6384", "#36A2EB"],
                borderColor: "#fff",
                borderWidth: 2,
              },
            ],
          });
        } else {
          console.error("Error en la respuesta:", result.message);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

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
