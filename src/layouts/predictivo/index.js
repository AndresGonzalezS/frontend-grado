import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import axios from "axios";

function Predictivo() {
  const [data, setData] = useState({});
  const [dataGenero, setGeneroData] = useState({});
  const [padreData, setPadreData] = useState({});
  const [sisbenData, setSisbenData] = useState({});
  const [etnia, setEtniaData] = useState({});
  const [desertoresPais, setDesertoresPais] = useState({});

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
          setData(response.data);
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
          setGeneroData(response.data);
        }
      } catch (error) {
        console.error("Error al obtener los datos de género:", error);
      }
    };
    fetchGeneroData();
  }, []);

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
          setPadreData(response.data);
        }
      } catch (error) {
        console.error("Error al obtener los datos de nivel educativo del padre:", error);
      }
    };
    fetchPadreData();
  }, []);

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
          setSisbenData(response.data);
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
          setEtniaData(response.data);
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
          setDesertoresPais(response.data);
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
          <Grid container spacing={2}></Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Predictivo;
