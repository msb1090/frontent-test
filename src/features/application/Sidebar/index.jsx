import {
  Grid,
  Stack,
  TextField,
  Button,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  STATUS,
  selectAllApplications,
  selectStatus,
  fetchApplicationList,
} from '../applicationSlice';
import { containerStyle, listItemStyle } from './Sidebar.styles';

export default function Sidebar() {
  const status = useSelector(selectStatus);
  const isPending = status === STATUS.PENDING;
  const applicationList = useSelector(selectAllApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchApplicationList());
  }, []);
  const createApplication = () => {
    navigate(`/applications/new_application/edit`);
  };
  const filteredApplicationList = searchTerm
    ? applicationList.filter(({ name }) =>
        name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : applicationList;

  return (
    <Grid item xs={12} sm={4} sx={containerStyle}>
      <div style={{ height: '100%' }}>
        <Stack direction="row" spacing={2} p={2}>
          <TextField
            label="Search"
            data-qa="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 1 }}
          />
          <Button
            disabled={isPending}
            variant="outlined"
            data-qa="new-aplication-button"
            onClick={createApplication}
            sx={{ width: 80, minWidth: 80 }}
          >
            New
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} p={2} component="nav">
          <List sx={{ width: '100%' }}>
            {filteredApplicationList.map(
              ({ id: currentApplicationId, name, version }) => (
                <ListItemButton
                  key={currentApplicationId}
                  component={NavLink}
                  sx={listItemStyle}
                  to={`/applications/${currentApplicationId}`}
                >
                  {`${name} - ${version}`}
                </ListItemButton>
              ),
            )}
            {applicationList.length > 0 &&
              filteredApplicationList.length === 0 && (
                <Typography>No applications found.</Typography>
              )}
          </List>
        </Stack>
      </div>
    </Grid>
  );
}
