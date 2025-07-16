import React, { useState, useEffect } from 'react';
import { states, districts } from '../Common/Dropdown';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Grid,
} from '@mui/material';

import { createInquiry } from '../inquiry/Service/addInquiryForm';
import { getAllStudyConducts } from '../admission/service/studyConductApi';
import { getAllSeatTypes } from '../admission/service/studySeatTypeApi';
import { getAllStudySources } from '../admission/service/studySourceApi';

const initialState = {
  name: '',
  mobNo: '',
  email: '',
  seatType: '',
  state: '',
  district: '',
  city: '',
  taluka: '',
  pincode: '',
  gender: '',
  date: '',
  studySource: '',
  studyConduct: '',
  status: '',
  remark: '',
};

const fields = [
  { label: 'Name', name: 'name', required: true },
  { label: 'Mobile No', name: 'mobNo' },
  { label: 'Email', name: 'email', required: true },
  { label: 'State', name: 'state' },
  { label: 'District', name: 'district' },
  { label: 'City', name: 'city' },
  { label: 'Taluka', name: 'taluka' },
  { label: 'Pincode', name: 'pincode' },
  { label: 'Gender', name: 'gender' },
  { label: 'Date', name: 'date', type: 'date', required: true, InputLabelProps: { shrink: true } },
  { label: 'Status', name: 'status' },
  { label: 'Remark', name: 'remark' },
];

function AddInquiryForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [conductOptions, setConductOptions] = useState([]);
  const [seatTypeOptions, setSeatTypeOptions] = useState([]);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [districtList, setDistrictList] = useState([]);

  useEffect(() => {
    getAllStudyConducts().then(setConductOptions);
    getAllSeatTypes().then(setSeatTypeOptions);
    getAllStudySources().then(setSourceOptions);
    setDistrictList(districts[form.state] || []);
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'state') {
      setDistrictList(districts[value] || []);
      setForm((prev) => ({ ...prev, district: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await createInquiry(form);
      setMsg('Inquiry submitted successfully!');
      setForm(initialState);
      setDistrictList([]);
    } catch (err) {
      setMsg('Submission failed.');
    }
    setLoading(false);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        backgroundColor: '#FFFBE6',
        // maxWidth: 1400,
        margin: '32px auto',
      }}
    >
      <Typography variant="h5" align="center" fontWeight="bold" color="black" gutterBottom>
        Add Inquiry Form
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            {fields.map((field) => {
              // State dropdown
              if (field.name === 'state') {
                return (
                  <Grid item xs={12} sm={6} md={4} key="state">
                    <TextField
                      select
                      label="State"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                      required
                      sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
                    >
                      <MenuItem value="" disabled hidden>
                        Select State
                      </MenuItem>
                      {states.map((state) => (
                        <MenuItem key={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                );
              }
              // District dropdown
              if (field.name === 'district') {
                return (
                  <Grid item xs={12} sm={6} md={4} key="district">
                    <TextField
                      select
                      label="District"
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                      required
                      sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
                      disabled={!form.state}
                    >
                      <MenuItem value="" disabled hidden>
                        Select District
                      </MenuItem>
                      {districtList.map((district) => (
                        <MenuItem key={district} value={district}>
                          {district}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                );
              }
              // Gender dropdown
              if (field.name === 'gender') {
                return (
                  <Grid item xs={12} sm={6} md={4} key="gender">
                    <TextField
                      select
                      label="Gender"
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                      required
                      sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
                    >
                      <MenuItem value="" disabled hidden>
                        Select Gender
                      </MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </TextField>
                  </Grid>
                );
              }
              // Status dropdown
              if (field.name === 'status') {
                return (
                  <Grid item xs={12} sm={6} md={4} key="status">
                    <TextField
                      select
                      label="Status"
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                      required
                      sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
                    >
                      <MenuItem value="" disabled hidden>
                        Select Status
                      </MenuItem>
                      <MenuItem value="Callback">Callback</MenuItem>
                      <MenuItem value="Interested">Interested</MenuItem>
                      <MenuItem value="Not Interested">Not Interested</MenuItem>
                      <MenuItem value="DND">Do Not Disturb</MenuItem>
                      <MenuItem value="Joined">Joined</MenuItem>
                      <MenuItem value="Ringing/Waiting">Ringing/Waiting</MenuItem>
                    </TextField>
                  </Grid>
                );
              }
              // Default: regular text field
              return (
                <Grid item xs={12} sm={6} md={4} key={field.name}>
                  <TextField
                    label={field.label}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    size="small"
                    required={field.required}
                    type={field.type || 'text'}
                    InputLabelProps={field.InputLabelProps}
                    sx={{
                      backgroundColor: '#fffbe6',
                      borderRadius: 1,
                      minWidth: 300,
                    }}
                    InputProps={{
                      style: { fontWeight: 500, color: '#222' },
                    }}
                  />
                </Grid>
              );
            })}

            {/* Study Conduct Dropdown */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Study Conduct"
                name="studyConduct"
                value={form.studyConduct}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                required
                sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
              >
                <MenuItem value="" disabled hidden>
                  Select Study Conduct
                </MenuItem>
                {conductOptions.map((option) => (
                  <MenuItem key={option.id} value={option.studyConduct}>
                    {option.studyConduct}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Seat Type Dropdown */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Seat Type"
                name="seatType"
                value={form.seatType}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                required
                sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
              >
                <MenuItem value="" disabled hidden>
                  Select Seat Type
                </MenuItem>
                {seatTypeOptions.map((option) => (
                  <MenuItem key={option.id} value={option.seatType}>
                    {option.seatType}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Study Source Dropdown */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Study Source"
                name="studySource"
                value={form.studySource}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                required
                sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
              >
                <MenuItem value="" disabled hidden>
                  Select Study Source
                </MenuItem>
                {sourceOptions.map((option) => (
                  <MenuItem key={option.id} value={option.studySource}>
                    {option.studySource}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

          </Grid>

          {/* Submit Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#E6B17A',
                color: 'black',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#D9A066' },
                width: 200,
                height: 40,
              }}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>

          {msg && (
            <Typography align="center" color={msg.includes('success') ? 'green' : 'red'} mt={2}>
              {msg}
            </Typography>
          )}
        </Box>
      </form>
    </Paper>
  );
}

export default AddInquiryForm;