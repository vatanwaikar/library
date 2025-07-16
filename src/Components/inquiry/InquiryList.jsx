import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Box,
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';
import { getAllInquiries } from '../inquiry/Service/addInquiryForm';

function InquiryList() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [nameFilter, setNameFilter] = useState('');
  const [seatTypeFilter, setSeatTypeFilter] = useState('');

  useEffect(() => {
    getAllInquiries()
      .then(setInquiries)
      .finally(() => setLoading(false));
  }, []);

  const seatTypes = [...new Set(inquiries.map(i => i.seatType).filter(Boolean))];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = inquiries.filter(inquiry => {
    const nameMatch = inquiry.name?.toLowerCase().includes(nameFilter.toLowerCase());
    const seatMatch = seatTypeFilter === '' || inquiry.seatType === seatTypeFilter;
    return nameMatch && seatMatch;
  });

  const displayData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Common TextField styling
  const commonTextFieldStyles = {
    backgroundColor: '#fffbe6',
    borderRadius: 1,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc',
      },
      '&:hover fieldset': {
        borderColor: '#E6B17A',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#E6B17A',
      },
    },
  };

  return (
    <Paper sx={{ p: 3, m: 1, backgroundColor: "#FFFBE6" }}>
      <Typography variant="h5" gutterBottom>
        Inquiry List
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="Filter by Name"
            variant="outlined"
            size="small"
            fullWidth
            value={nameFilter}
            onChange={(e) => {
              setNameFilter(e.target.value);
              setPage(0);
            }}
            sx={commonTextFieldStyles}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Filter by Seat Type"
            variant="outlined"
            size="small"
            fullWidth
            value={seatTypeFilter}
            onChange={(e) => {
              setSeatTypeFilter(e.target.value);
              setPage(0);
            }}
            sx={commonTextFieldStyles}
          >
            <MenuItem value="">All</MenuItem>
            {seatTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Mobile No</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>State</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>District</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Seat Type</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Study Conduct</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Study Source</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayData.map((inq) => (
                  <TableRow
                    key={inq.id}
                    sx={{ '&:hover': { backgroundColor: '#FFF3E0' } }}
                  >
                    <TableCell>{inq.id}</TableCell>
                    <TableCell>{inq.name}</TableCell>
                    <TableCell>{inq.mobNo}</TableCell>
                    <TableCell>{inq.email}</TableCell>
                    <TableCell>{inq.state}</TableCell>
                    <TableCell>{inq.district}</TableCell>
                    <TableCell>{inq.seatType}</TableCell>
                    <TableCell>{inq.studyConduct}</TableCell>
                    <TableCell>{inq.studySource}</TableCell>
                    <TableCell>{inq.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              '.MuiTablePagination-select': { backgroundColor: '#fff' },
              '.MuiTablePagination-selectIcon': { color: '#E6B17A' },
              '.MuiTablePagination-displayedRows': { color: '#666' },
            }}
          />
        </>
      )}
    </Paper>
  );
}

export default InquiryList;
