import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";

export default function StudentCards() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los datos del endpoint sin token
  useEffect(() => {
    const fetchStudentsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/master/top/General");

        // Asignar directamente la respuesta a los estudiantes
        setStudents(response.data); // La respuesta es directamente la lista de estudiantes
      } catch (error) {
        console.error("Error al obtener los datos de estudiantes:", error);
        setError("No se pudieron cargar los datos. Intenta nuevamente más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
      {students.map((student) => (
        <Card
          key={student.CARNET}
          sx={{
            textAlign: "center",
            alignItems: "center",
            width: 343,
            overflow: "auto",
          }}
        >
          <CardContent sx={{ maxWidth: "40ch" }}>
            <PersonIcon sx={{ fontSize: "4rem", color: "#000" }} />
            <Typography variant="h5" sx={{ mt: 2 }}>
              {student.NOMBRE}
            </Typography>
            <Typography variant="body2">Carnet: {student.CARNET}</Typography>
            <Typography variant="body2">Facultad: {student.FACULTAD}</Typography>
            <Typography variant="body2">
              Probabilidad de deserción: {(student.probabilidad_desercion * 100).toFixed(2)}%
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button variant="contained" color="primary">
              Ver detalles
            </Button>
          </CardActions> */}
        </Card>
      ))}
    </div>
  );
}
