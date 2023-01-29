import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import axios from "axios";

export default function RecipeReviewCard(props) {
  const navigate = useNavigate();
  const entertest = async () => {
    await axios
      .post("/exam/examdb/logtest", {
        idtest: `${props.testid}`,
      })
      .then((resp) => {
        console.log(resp);
        navigate("/student/intest");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card sx={{ maxWidth: 900 }} className="my-4">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            NB
          </Avatar>
        }
        title={props.subject}
        subheader={props.date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.instruction}
        </Typography>
      </CardContent>
      <Button
        className="col-lg-2 col-4 ms-3 my-3"
        variant="outlined"
        onClick={entertest}
      >
        Enter
      </Button>
    </Card>
  );
}
