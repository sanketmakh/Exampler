import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Result() {
  const [results, setResults] = useState([]);
  var [tid, setTid] = useState("");

  const gettest = async () => {
    await axios
      .get("/exam/admintest")
      .then((responce) => {
        setTid((tid = responce.data._id));

        getstudent(responce.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getstudent = async (testid) => {
    console.log(testid);
    await axios
      .get(`/result/resultdb/${testid}`)
      .then((responce) => {
        setResults(responce.data);
        console.log(responce.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    gettest();
  }, []);

  return (
    <div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="fw-bold">Fristname</TableCell>
                <TableCell className="fw-bold">Lastname&nbsp;</TableCell>
                {/* <TableCell className="fw-bold">Roll No&nbsp;</TableCell> */}
                <TableCell className="fw-bold">Marks&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row) => (
                <TableRow
                  key={row.classroom}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.firstname}</TableCell>
                  <TableCell>{row.lastname}</TableCell>
                  {/* <TableCell>{row.classroom}</TableCell> */}
                  <TableCell>{row.mark}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Result;
