import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Source as SourceIcon,
  School as ConductIcon,
  Chair as SeatTypeIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

// Study Conduct Services
import {
  getAllStudyConducts,
  createStudyConduct,
  deleteStudyConduct,
} from "../admission/service/studyConductApi";

// Seat Type Services
import {
  getAllSeatTypes,
  createSeatType,
  deleteSeatType,
} from "../admission/service/studySeatTypeApi";

// Study Source Services
import {
  getAllStudySources,
  createStudySource,
  deleteStudySource,
} from "../admission/service/studySourceApi";

const sectionBoxStyle = {
  backgroundColor: "#fffbe6",
  borderRadius: 2,
  p: 3,
  mb: 4,
  boxShadow: 2,
  width: "100%",
  maxWidth: "800px",
};

const menuItems = [
  { id: "conduct", label: "Study Conduct", icon: <ConductIcon /> },
  { id: "seatType", label: "Seat Type", icon: <SeatTypeIcon /> },
  { id: "source", label: "Study Source", icon: <SourceIcon /> },
];

const Sidebar = ({ selectedComponent, onSelect }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Paper
      elevation={3}
      sx={{
        width: isCollapsed ? 45 : 230,
        padding: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: 8,
        backgroundColor: "#f7e8cd", // NEW BEIGE
        transition: "width 0.3s ease",
        height: "100%",
        overflowY: "hidden",
        border: "1px solid black",
        marginTop: "20px",
      }}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      {menuItems.map((item) => (
        <Box
          key={item.id}
          onClick={() => onSelect(item.id)}
          sx={{ overflow: "hidden", cursor: "pointer" }}
          title={isCollapsed ? item.label : ""}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isCollapsed ? "center" : "flex-start",
              gap: isCollapsed ? 0 : 1.5,
              padding: "10px",
              fontSize: 13,
              color: selectedComponent === item.id ? "black" : "black",
              border: selectedComponent === item.id ? "1px solid black" : "white",
              fontWeight: selectedComponent === item.id ? 600 : 400,
              borderRadius: 16,
              backgroundColor:
                selectedComponent === item.id ? "white" : "transparent",
              boxShadow:
                selectedComponent === item.id
                  ? "0px 4px 10px rgba(0, 0, 0, 0.2)"
                  : "none",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            {item.icon}
            {!isCollapsed && item.label}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
};

const AdmissionSettings = () => {
  const [selectedComponent, setSelectedComponent] = useState("conduct");

  const [conducts, setConducts] = useState([]);
  const [conductInput, setConductInput] = useState("");

  const [seatTypes, setSeatTypes] = useState([]);
  const [seatTypeInput, setSeatTypeInput] = useState({
    seatType: "",
    totalSeats: "",
    availableSeats: "",
    seatAmount: "",
  });

  const [sources, setSources] = useState([]);
  const [sourceInput, setSourceInput] = useState("");

  useEffect(() => {
    getAllStudyConducts().then(setConducts);
    getAllSeatTypes().then(setSeatTypes);
    getAllStudySources().then(setSources);
  }, []);

  const handleAddConduct = async (e) => {
    e.preventDefault();
    if (!conductInput.trim()) return;
    const res = await createStudyConduct({ studyConduct: conductInput });
    setConducts([...conducts, res]);
    setConductInput("");
  };
  const handleDeleteConduct = async (id) => {
    await deleteStudyConduct(id);
    setConducts(conducts.filter((c) => c.id !== id));
  };

  const handleAddSeatType = async (e) => {
    e.preventDefault();
    if (!seatTypeInput.seatType.trim()) return;
    const res = await createSeatType({
      seatType: seatTypeInput.seatType,
      totalSeats: Number(seatTypeInput.totalSeats),
      availableSeats: Number(seatTypeInput.availableSeats),
      seatAmount: Number(seatTypeInput.seatAmount),
    });
    setSeatTypes([...seatTypes, res]);
    setSeatTypeInput({ seatType: "", totalSeats: "", availableSeats: "", seatAmount: "" });
  };
  const handleDeleteSeatType = async (id) => {
    await deleteSeatType(id);
    setSeatTypes(seatTypes.filter((s) => s.id !== id));
  };

  const handleAddSource = async (e) => {
    e.preventDefault();
    if (!sourceInput.trim()) return;
    const res = await createStudySource({ studySource: sourceInput });
    setSources([...sources, res]);
    setSourceInput("");
  };
  const handleDeleteSource = async (id) => {
    await deleteStudySource(id);
    setSources(sources.filter((s) => s.id !== id));
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "conduct":
        return (
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Box sx={sectionBoxStyle}>
              <Typography variant="h6" fontWeight="bold" color="black" mb={2}>
                Study Conduct
              </Typography>
              <form onSubmit={handleAddConduct}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={8} md={6}>
                    <TextField
                      label="Add Study Conduct"
                      value={conductInput}
                      onChange={(e) => setConductInput(e.target.value)}
                      fullWidth
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        backgroundColor: "#E6B17A",
                        color: "black",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#D9A066" },
                      }}
                    >
                      ADD
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <Divider sx={{ my: 2 }} />
              <Box>
                {conducts.map((c) => (
                  <Box key={c.id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography sx={{ flex: 1 }}>{c.studyConduct}</Typography>
                    <IconButton onClick={() => handleDeleteConduct(c.id)}
                      sx={{ color: 'red' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        );

      case "seatType":
        return (
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Box sx={sectionBoxStyle}>
              <Typography variant="h6" fontWeight="bold" color="black" mb={2}>
                Seat Type
              </Typography>
              <form onSubmit={handleAddSeatType}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Seat Type"
                      value={seatTypeInput.seatType}
                      onChange={(e) => setSeatTypeInput({ ...seatTypeInput, seatType: e.target.value })}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Total Seats"
                      type="number"
                      value={seatTypeInput.totalSeats}
                      onChange={(e) => setSeatTypeInput({ ...seatTypeInput, totalSeats: e.target.value })}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Available Seats"
                      type="number"
                      value={seatTypeInput.availableSeats}
                      onChange={(e) => setSeatTypeInput({ ...seatTypeInput, availableSeats: e.target.value })}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      label="Amount"
                      type="number"
                      value={seatTypeInput.seatAmount}
                      onChange={(e) => setSeatTypeInput({ ...seatTypeInput, seatAmount: e.target.value })}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        backgroundColor: "#E6B17A",
                        color: "black",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#D9A066" },
                      }}
                    >
                      ADD
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <Divider sx={{ my: 2 }} />
              <Box>
                {seatTypes.map((s) => (
                  <Box key={s.id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography sx={{ flex: 1 }}>
                      {s.seatType} | Total: {s.totalSeats} | Available: {s.availableSeats} | ₹{s.seatAmount}
                    </Typography>
                    <IconButton onClick={() => handleDeleteSeatType(s.id)}
                      sx={{ color: 'red' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        );

      case "source":
        return (
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Box sx={sectionBoxStyle}>
              <Typography variant="h6" fontWeight="bold" color="black" mb={2}>
                Study Source
              </Typography>
              <form onSubmit={handleAddSource}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={8} md={6}>
                    <TextField
                      label="Add Study Source"
                      value={sourceInput}
                      onChange={(e) => setSourceInput(e.target.value)}
                      fullWidth
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#E6B17A",
                        color: "black",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#D9A066" },
                      }}
                    >
                      ADD
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <Divider sx={{ my: 2 }} />
              <Box>
                {sources.map((s) => (
                  <Box key={s.id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography sx={{ flex: 1 }}>{s.studySource}</Typography>
                    <IconButton onClick={() => handleDeleteSource(s.id)}
                      sx={{ color: 'red' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", padding: 2, height: "100%" }}>
      <Sidebar selectedComponent={selectedComponent} onSelect={setSelectedComponent} />
      <Box
        sx={{
          flexGrow: 1,
          padding: 2,
          marginLeft: 2,
          // border: "1px solid black", 
          // borderRadius: 2,
          backgroundColor: "#f9f9f9",
          overflowY: "auto",
        }}
      >
        {renderSelectedComponent()}
      </Box>
    </Box>
  );
};

export default AdmissionSettings;
