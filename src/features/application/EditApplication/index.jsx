import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  STATUS,
  selectApplicationById,
  updateApplication,
  getNewApplication,
  createNewApplication,
  selectStatus,
} from '../applicationSlice';
import { textfieldStyle } from './EditApplication.styles';

export default function EditApplication() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const isPending = status === STATUS.PENDING;
  const { applicationId } = useParams();
  const isCreateApplication = applicationId === 'new_application';
  const application =
    useSelector((state) =>
      isCreateApplication
        ? getNewApplication()
        : selectApplicationById(state, applicationId),
    ) || {};

  const [formData, setFormData] = useState({
    name: application.name,
    version: application.version,
    secret: application.secret,
    lang: application.lang,
  });

  useEffect(() => {
    if (!isCreateApplication && (!application || !application.id)) {
      navigate('/applications');
    }
  }, [application]);

  if (!isCreateApplication && (!application || !application.id)) {
    return undefined;
  }

  const handleUpdate = async () => {
    if (isCreateApplication) {
      const createAppAction = await dispatch(
        createNewApplication({ ...application, ...formData }),
      );
      if (createNewApplication.fulfilled.match(createAppAction)) {
        navigate(`/applications/${createAppAction.payload.data.id}`);
      } else if (createNewApplication.rejected.match(createAppAction)) {
        // show error
      }
    } else {
      const updateAppAction = await dispatch(
        updateApplication({ ...application, ...formData }),
      );
      if (updateApplication.fulfilled.match(updateAppAction)) {
        navigate(`/applications/${updateAppAction.payload.data.id}`);
      } else if (updateApplication.rejected.match(updateAppAction)) {
        // show error
      }
    }
  };

  const handleCancel = () => {
    navigate(`/applications/${application.id}`);
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <Grid item xs={12} sm={8} component="main">
      <Box py={2} sx={{ width: '100%', maxWidth: 600, pr: 2 }}>
        <Stack direction="row" gap={2}>
          <TextField
            label="Name"
            value={formData.name}
            name="name"
            onChange={handleChange}
            sx={textfieldStyle}
            autoFocus
          />
          <TextField
            label="Version"
            value={formData.version}
            name="version"
            onChange={handleChange}
            sx={textfieldStyle}
          />
        </Stack>
        <TextField
          label="Secret"
          value={formData.secret}
          name="secret"
          onChange={handleChange}
          sx={textfieldStyle}
        />
        <TextField
          label="Language"
          value={formData.lang}
          name="lang"
          onChange={handleChange}
          sx={textfieldStyle}
        />
        <Stack direction="row" mt={2}>
          <Button
            variant="contained"
            onClick={handleUpdate}
            disabled={isPending}
          >
            {isCreateApplication ? 'Create' : 'Save'}
          </Button>
          <Button
            sx={{ ml: 2 }}
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Grid>
  );
}
