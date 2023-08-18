import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import request from '../../app/api/request';

const APPLICATION_SLICE_NAME = 'application';
export const STATUS = {
  PENDING: 'PENDING',
  IDLE: 'IDLE',
};

const applicationAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.name - a.name,
});

const initialState = applicationAdapter.getInitialState({
  status: STATUS.IDLE,
  error: null,
});
const newApplicationDummy = {
  // id: 'new_application',
  name: 'Application',
  version: '1.0.0',
  secret: 'secret',
  lang: 'En',
};
export const getNewApplication = () => newApplicationDummy;

export const fetchApplicationList = createAsyncThunk(
  `${APPLICATION_SLICE_NAME}/fetchApplicationList`,
  async (filterData = {}) => {
    const queryData = new URLSearchParams({
      page: 1,
      ...filterData,
    }).toString();
    return request.get(`/applications?${queryData}`);
  },
);

export const createNewApplication = createAsyncThunk(
  `${APPLICATION_SLICE_NAME}/createNewApplication`,
  async (appData) => request.post('/applications', appData),
);

export const updateApplication = createAsyncThunk(
  `${APPLICATION_SLICE_NAME}/updateApplication`,
  async (appData) => request.put(`/applications/${appData.id}`, appData),
);

export const deleteApplication = createAsyncThunk(
  `${APPLICATION_SLICE_NAME}/deleteApplication`,
  async (applicationId) => {
    await request.delete(`/applications/${applicationId}`);
    return applicationId;
  },
);
const setLoading = (state) => {
  state.status = STATUS.PENDING;
};
const applicationSlice = createSlice({
  name: APPLICATION_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewApplication.pending, setLoading)
      .addCase(createNewApplication.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        applicationAdapter.addOne(state, action.payload.data);
      })
      .addCase(fetchApplicationList.pending, setLoading)
      .addCase(fetchApplicationList.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        applicationAdapter.addMany(state, action.payload.data['hydra:member']);
      })
      .addCase(deleteApplication.pending, setLoading)
      .addCase(deleteApplication.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        applicationAdapter.removeOne(state, action.payload);
      })
      .addCase(updateApplication.pending, setLoading)
      .addCase(updateApplication.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        const {
          payload: { data },
        } = action;
        applicationAdapter.updateOne(state, {
          id: data.id,
          changes: data,
        });
      });
  },
});

export const selectStatus = (state) => state[APPLICATION_SLICE_NAME].status;
export const {
  selectAll: selectAllApplications,
  selectById: selectApplicationById,
  selectIds: selectApplicationIds,
} = applicationAdapter.getSelectors((state) => state[APPLICATION_SLICE_NAME]);

export default applicationSlice.reducer;
