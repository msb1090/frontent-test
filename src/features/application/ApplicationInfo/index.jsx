import { Button, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { selectApplicationById, deleteApplication } from '../applicationSlice';
import { containerStyle } from './ApplicationInfo.styles';

export default function ApplicationInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { applicationId } = useParams();
  const application =
    useSelector((state) => selectApplicationById(state, applicationId)) || {};

  useEffect(() => {
    if (!application || !application['@id']) {
      navigate('/applications');
    }
  }, [application]);

  if (!application || !application['@id']) {
    return undefined;
  }

  const handleDelete = () => {
    dispatch(deleteApplication(application.id));
  };

  const handleEdit = () => {
    navigate(`/applications/${application.id}/edit`);
  };

  return (
    <Grid item xs={12} sm={8} component="main" sx={{ p: 0 }}>
      <Stack py={2} sx={containerStyle}>
        <Stack direction="row" spacing={2}>
          <Stack>
            <Typography variant="h1">{application.name}</Typography>
            <Typography>{application.version}</Typography>
          </Stack>
        </Stack>
        <Typography>{application.secret}</Typography>
        <Typography>{application.lang}</Typography>
        <Stack direction="row" mt={2}>
          <Button variant="contained" onClick={handleEdit}>
            Edit
          </Button>
          <Button
            sx={{ ml: 2 }}
            variant="outlined"
            color="secondary"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
}
