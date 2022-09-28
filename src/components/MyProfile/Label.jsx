import { Grid, Typography } from "@mui/material";

const Label = ({ title, value }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography
          component="p"
          variant="p"
          sx={{ margin: "3%", textAlign: "right" }}
        >
          {title}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Grid>
          <Typography component="p" variant="p" sx={{ margin: "3%" }}>
            : {value}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Label;
