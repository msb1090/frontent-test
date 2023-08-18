import { Grid, AppBar, Typography, Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '@/features/application/Sidebar';
import ApplicationInfo from '@/features/application/ApplicationInfo';
import EditApplication from '@/features/application/EditApplication';
import Welcome from '@/features/application/Welcome';
import { selectUser } from '@/features/user/userSlice';

// const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function ApplicationPage() {
  const user = useSelector((state) => selectUser(state));
  return (
    <>
      <AppBar>
        <Typography m={2}>{user.email}</Typography>
      </AppBar>
      <Box sx={(theme) => theme.mixins.toolbar} />
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        spacing={2}
      >
        <Sidebar />
        <Routes>
          <Route index element={<Welcome />} />
          <Route path=":applicationId" element={<ApplicationInfo />} />
          <Route path=":applicationId/edit" element={<EditApplication />} />
        </Routes>
      </Grid>
    </>
  );
}

export default ApplicationPage;
