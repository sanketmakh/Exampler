import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

function Help() {
  return (
    <div>
      <Card sx={{ maxWidth: 900 }} className=" col-lg-6 col-12 mx-auto my-4">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              EP
            </Avatar>
          }
          title="Prof. Michael Jackson"
          subheader="Head of the department"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            For any query kindly contact on - admin@test.com
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Help;
