import React, { useEffect, useState } from 'react';
import {
  Paper, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, CircularProgress, Box,
  TextField, Grid, MenuItem, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, Button
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import {
  getAllAdmissions,
  deleteAdmission,
  updateAdmission,
  getAdmissionById
} from '../admission/service/addAdmissionForm';

function AdmissionList() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [nameFilter, setNameFilter] = useState('');
  const [seatTypeFilter, setSeatTypeFilter] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState(null);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = () => {
    setLoading(true);
    getAllAdmissions()
      .then((data) => setAdmissions(data || []))
      .finally(() => setLoading(false));
  };

  const seatTypes = [...new Set(admissions.map(i => i.seatType).filter(Boolean))];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = async (id) => {
    const data = await getAdmissionById(id);
    setSelectedAdmission(data);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this admission?")) {
      await deleteAdmission(id);
      fetchAdmissions();
    }
  };

  const handleEditSubmit = async () => {
    await updateAdmission(selectedAdmission.id, selectedAdmission);
    setEditDialogOpen(false);
    fetchAdmissions();
  };

  const filteredData = admissions.filter(admission => {
    const nameMatch = admission.name?.toLowerCase().includes(nameFilter.toLowerCase());
    const seatMatch = seatTypeFilter === '' || admission.seatType === seatTypeFilter;
    return nameMatch && seatMatch;
  });

  const displayData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const commonTextFieldStyles = {
    backgroundColor: '#fffbe6',
    borderRadius: 1,
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#ccc' },
      '&:hover fieldset': { borderColor: '#E6B17A' },
      '&.Mui-focused fieldset': { borderColor: '#E6B17A' },
    },
  };

  return (
    <Paper sx={{ p: 3, m: 1, backgroundColor: '#FFFBE6' }}>
      <Typography variant="h5" gutterBottom>Admission List</Typography>

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
              <MenuItem key={index} value={type}>{type}</MenuItem>
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
                  <TableCell sx={{ fontWeight: 'bold' }}>Seat Type</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Seat Number</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Study Conduct</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayData.map((admission) => (
                  <TableRow key={admission.id}>
                    <TableCell>{admission.id}</TableCell>
                    <TableCell>{admission.name}</TableCell>
                    <TableCell>{admission.mobNo}</TableCell>
                    <TableCell>{admission.email}</TableCell>
                    <TableCell>{admission.seatType}</TableCell>
                    <TableCell>{admission.seatNumber}</TableCell>
                    <TableCell>{admission.seatAmount}</TableCell>
                    <TableCell>{admission.studyConduct}</TableCell>
                    <TableCell>{admission.date}</TableCell>
                    <TableCell>{admission.status}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton onClick={() => handleEditClick(admission.id)} sx={{ color: 'green' }}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(admission.id)} sx={{ color: 'red' }}>
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
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
          />
        </>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Admission</DialogTitle>
        <DialogContent>
          {selectedAdmission && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {[
                { label: 'Name', key: 'name' },
                { label: 'Mobile No', key: 'mobNo' },
                { label: 'Email', key: 'email' },
                { label: 'Seat Type', key: 'seatType' },
                { label: 'Seat Number', key: 'seatNumber' },
                { label: 'Seat Amount', key: 'seatAmount' },
                { label: 'Study Conduct', key: 'studyConduct' },
                { label: 'Date', key: 'date' },
                { label: 'Status', key: 'status' },
              ].map((field, index) => (
                <Grid item xs={12} key={index}>
                  <TextField
                    fullWidth
                    label={field.label}
                    value={selectedAdmission[field.key] || ''}
                    onChange={(e) =>
                      setSelectedAdmission({ ...selectedAdmission, [field.key]: e.target.value })
                    }
                    sx={commonTextFieldStyles}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            sx={{
              backgroundColor: '#E6B17A',
              '&:hover': { backgroundColor: '#d89a54' },
              color: '#000',
              fontWeight: 'bold'
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default AdmissionList;
