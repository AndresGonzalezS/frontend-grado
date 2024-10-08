import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Projects() {
  const data = [
    { year: 2014, numberOfDropouts: 402 },
    { year: 2015, numberOfDropouts: 630 },
    { year: 2016, numberOfDropouts: 880 },
    { year: 2017, numberOfDropouts: 930 },
    { year: 2018, numberOfDropouts: 1220 },
    { year: 2019, numberOfDropouts: 1540 },
    { year: 2020, numberOfDropouts: 1470 },
  ];

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Deserción por Año
        </MDTypography>
        <MDBox mt={2}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Año</TableCell>
                  <TableCell>Deserción (Número de Estudiantes)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.year}>
                    <TableCell>{row.year}</TableCell>
                    <TableCell>{row.numberOfDropouts}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Projects;
