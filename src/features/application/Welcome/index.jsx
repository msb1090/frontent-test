import { Grid, Typography } from '@mui/material';

export default function Welcome() {
  return (
    <Grid item xs={12} sm={8} component="main">
      <Typography py={2}>Select or Create an application.</Typography>
    </Grid>
  );
}
