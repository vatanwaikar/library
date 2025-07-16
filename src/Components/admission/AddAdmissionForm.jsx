import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Grid,
} from '@mui/material';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { createAdmission } from '../admission/service/addAdmissionForm';
import { getAllSeatTypes } from '../admission/service/studySeatTypeApi';
import { getAllStudyConducts } from '../admission/service/studyConductApi';
import { getSeatAvailability } from '../admission/service/addAdmissionForm';

const initialState = {
  name: '',
  mobNo: '',
  email: '',
  seatType: '',
  date: '',
  seatNumber: '',
  seatAmount: '',
  paymentmode: '',
  status: '',
  startdate: '',
  enddate: '',
  month: '',
  year: '',
  studyConduct: '',
  remark: '',
  gstpercent: '',
  gst: '',
  status: '',
};

const paymentModes = [
  'Cash',
  'UPI',
  'Card',
  'Net Banking',
  'Cheque',
  'Other',
];
const statusOptions = [
  'Active',
  'Inactive',
  'Pending',
  'Completed',
];


function AddAdmissionForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [conductOptions, setConductOptions] = useState([]);
  const [seatTypeOptions, setSeatTypeOptions] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    getAllSeatTypes().then(setSeatTypeOptions);
    getAllStudyConducts().then(setConductOptions);
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'seatType') {
      setForm((prev) => ({ ...prev, seatNumber: '' }));
      try {
        const data = await getSeatAvailability(value);
        setAvailableSeats(data.availableSeats || []);
        setBookedSeats(data.bookedSeats || []);
        setForm((prev) => ({
          ...prev,
          seatAmount: data.seatAmount || '',
        }));
      } catch {
        setAvailableSeats([]);
        setBookedSeats([]);
      }
    }
  };

  const handleSeatSelect = (seat) => {
    setForm((prev) => ({ ...prev, seatNumber: seat }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await createAdmission(form);
      setMsg('Admission submitted successfully!');
      setForm(initialState);
      setAvailableSeats([]);
      setBookedSeats([]);
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
        Add Admission Form
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                size="small"
                sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
              />
            </Grid>

            {/* Mobile */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Mobile No"
                name="mobNo"
                value={form.mobNo}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                size="small"
                sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
              />
            </Grid>

            {/* Seat Type */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Seat Type"
                name="seatType"
                value={form.seatType}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                size="small"
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

            {/* Date */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
              />
            </Grid>

            {/* Seat Amount */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Seat Amount"
                name="seatAmount"
                value={form.seatAmount}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }}
                sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
              />
            </Grid>

            {/* Payment Mode */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Payment Mode"
                name="paymentmode"
                value={form.paymentmode}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                size="small"
                sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
              >
                <MenuItem value="" disabled hidden>
                  Select Payment Mode
                </MenuItem>
                {paymentModes.map((mode) => (
                  <MenuItem key={mode} value={mode}>
                    {mode}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Start Date */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Start Date"
                name="startdate"
                type="date"
                value={form.startdate}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
              />
            </Grid>

            {/* End Date */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="End Date"
                name="enddate"
                type="date"
                value={form.enddate}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
              />
            </Grid>

            {/* Study Conduct */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Study Conduct"
                name="studyConduct"
                value={form.studyConduct}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                size="small"
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

            {/* Remark */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Remark"
                name="remark"
                value={form.remark}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
              />
            </Grid>

            {/* GST Percent */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="GST Percent"
                name="gstpercent"
                type="number"
                value={form.gstpercent}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
              />
            </Grid>

            {/* GST */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="GST"
                name="gst"
                type="number"
                value={form.gst}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
                sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                size="small"
                sx={{ backgroundColor: '#fffbe6', borderRadius: 1, minWidth: 300 }}
              >
                <MenuItem value="" disabled hidden>
                  Select Status
                </MenuItem>
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* Seat Selection */}
          {availableSeats.length > 0 && (
            <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #E6B17A' }}>
              <Typography variant="h6" align="center" sx={{ mb: 3 }}>
                Select Your Seat
              </Typography>

              {/* Seats Container */}
              <Box sx={{
                maxWidth: 800,
                margin: '0 auto',
                p: 3,
                backgroundColor: '#fff',
                borderRadius: 2,
                boxShadow: '0 0 10px rgba(0,0,0,0.1)'
              }}>
                <Box sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'center'
                }}>
                  {[...availableSeats, ...bookedSeats].map((seat) => {
                    const isBooked = bookedSeats.includes(seat);
                    const isSelected = form.seatNumber === seat;

                    return (
                      <Box
                        key={seat}
                        onClick={() => !isBooked && handleSeatSelect(seat)}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          cursor: isBooked ? 'not-allowed' : 'pointer',
                          p: 1,
                          borderRadius: 1,
                          backgroundColor: isBooked
                            ? '#f8d7da'
                            : isSelected
                              ? '#FFF3E0'
                              : '#fff',
                          border: isSelected
                            ? '2px solid #E6B17A'
                            : '1px solid #ddd',
                          '&:hover': !isBooked && {
                            backgroundColor: '#FFF3E0',
                            borderColor: '#E6B17A',
                          }
                        }}
                      >
                        <EventSeatIcon
                          sx={{
                            fontSize: 32,
                            color: isBooked
                              ? '#dc3545'
                              : isSelected
                                ? '#E6B17A'
                                : '#666',
                          }}
                        />
                        <Typography variant="caption">
                          {seat}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>

                {/* Legend */}
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 4,
                  mt: 4,
                  pt: 2,
                  borderTop: '1px solid #eee'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EventSeatIcon sx={{ color: '#666', fontSize: 20 }} />
                    <Typography variant="caption">Available</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EventSeatIcon sx={{ color: '#E6B17A', fontSize: 20 }} />
                    <Typography variant="caption">Selected</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EventSeatIcon sx={{ color: '#dc3545', fontSize: 20 }} />
                    <Typography variant="caption">Booked</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {/* Submit Button */}
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
              mt: 4,
              display: 'block',
              margin: '2rem auto',
            }}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>

        {msg && (
          <Typography
            align="center"
            color={msg.includes('success') ? 'green' : 'red'}
            mt={2}
          >
            {msg}
          </Typography>
        )}
      </form>
    </Paper>
  );
}

export default AddAdmissionForm;