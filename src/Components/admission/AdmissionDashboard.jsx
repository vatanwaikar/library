import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider,
  TextField,
  MenuItem,
} from '@mui/material';
import Plot from 'react-plotly.js';
import { getAdmissionStatistics, getMonthlyStatistics,getDailyStats } from '../admission/service/addAdmissionForm';


const AdmissionCard = ({ title, count, revenue, background }) => (
  <Card sx={{ width: 280, backgroundColor: background, borderRadius: 2, boxShadow: 3 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" fontWeight="bold">{count || 0}</Typography>
        <Typography variant="subtitle2" color="text.secondary">Admissions</Typography>
      </Box>
      <Divider sx={{ my: 1.5 }} />
      <Box>
        <Typography variant="h5" fontWeight="bold">₹{revenue?.toLocaleString() || 0}</Typography>
        <Typography variant="subtitle2" color="text.secondary">Revenue</Typography>
      </Box>
    </CardContent>
  </Card>
);

function AdmissionDashboard() {
  const [stats, setStats] = useState({
    todayAdmissionCount: 0,
    last7DaysAdmissionCount: 0,
    last30DaysAdmissionCount: 0,
    last365DaysAdmissionCount: 0,
    totalAdmissionCount: 0,
    todayRevenue: 0,
    last7DaysRevenue: 0,
    last30DaysRevenue: 0,
    last365DaysRevenue: 0,
    totalRevenue: 0,
  });

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlyData, setMonthlyData] = useState({
    months: [],
    revenue: [],
    admissionCount: []
  });
  const [dailyStats, setDailyStats] = useState([]);

  useEffect(() => {
    getAdmissionStatistics().then(setStats);
  }, []);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      const data = await getMonthlyStatistics(selectedYear);
      const months = Object.keys(data);
      const revenue = months.map(month => data[month].revenue || 0);
      const admissionCount = months.map(month => data[month].admissionCount || 0);
      setMonthlyData({ months, revenue, admissionCount });
    };
    fetchMonthlyData();
  }, [selectedYear]);

  useEffect(() => {
    getDailyStats().then(setDailyStats);
  }, []);
  

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>Admission Statistics</Typography>
      
      {/* Statistics Cards */}
      <Grid container spacing={3}>
        <Grid item>
          <AdmissionCard
            title="Total"
            count={stats.totalAdmissionCount}
            revenue={stats.totalRevenue}
            background="#FFFBE6"
          />
        </Grid>
        <Grid item>
          <AdmissionCard
            title="Today"
            count={stats.todayAdmissionCount}
            revenue={stats.todayRevenue}
            background="#F7E8CD"
          />
        </Grid>
        <Grid item>
          <AdmissionCard
            title="Last 30 Days"
            count={stats.last30DaysAdmissionCount}
            revenue={stats.last30DaysRevenue}
            background="#E6B17A"
          />
        </Grid>
        <Grid item>
          <AdmissionCard
            title="Last 365 Days"
            count={stats.last365DaysAdmissionCount}
            revenue={stats.last365DaysRevenue}
            background="#D9A066"
          />
        </Grid>
      </Grid>

      {/* Daily Statistics Pie Chart */}
<Box sx={{ mt: 6 }}>
  <Typography variant="h6" sx={{ mb: 2 }}>Daily Revenue Distribution</Typography>
  <Plot
    data={[
      {
        type: 'pie',
        values: dailyStats.map(stat => stat.revenue),
        labels: dailyStats.map(stat => stat.date),
        text: dailyStats.map(stat => `Count: ${stat.count}`),
        textinfo: 'label+percent',
        hoverinfo: 'label+value+text',
        hole: 0.4,
        marker: {
          colors: [
            '#FFB74D',
            '#FF8A65',
            '#F06292',
            '#BA68C8',
            '#7986CB',
          ]
        },
        scalegroup: 'one',
        domain: {
          row: 0,
          column: 0
        },
      }
    ]}
    layout={{
      height: 400,
      margin: { l: 0, r: 0, t: 30, b: 0 },
      paper_bgcolor: '#FFFFFF',
      scene: {
        camera: {
          eye: { x: 1.5, y: 1.5, z: 1.5 }
        }
      },
      showlegend: true,
      legend: {
        orientation: 'h',
        y: -0.1
      },
      annotations: [{
        text: 'Revenue',
        showarrow: false,
        x: 0.5,
        y: 0.5
      }]
    }}
    config={{ responsive: true }}
  />
</Box>

      {/* Monthly Statistics */}
      <Box sx={{ mt: 6 }}>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6">Monthly Statistics</Typography>
          <TextField
            select
            size="small"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            sx={{ minWidth: 100, backgroundColor: '#fffbe6' }}
          >
            {[2023, 2024, 2025].map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </TextField>
        </Box>

        <Plot
  data={[
    {
      type: 'bar',
      name: 'Admissions',
      x: monthlyData.months,
      y: monthlyData.admissionCount,
      marker: { color: 'rgba(255, 127, 80, 0.6)', line: { color: 'rgba(255, 127, 80, 1)', width: 1 } }
    },
    {
      type: 'bar',
      name: 'Revenue',
      x: monthlyData.months,
      y: monthlyData.revenue,
      yaxis: 'y2',
      marker: { color: 'rgba(60, 179, 113, 0.6)', line: { color: 'rgba(60, 179, 113, 1)', width: 1 } }
    }
  ]}
  layout={{
    barmode: 'group',
    height: 400,
    margin: { l: 50, r: 50, t: 30, b: 30 },
    paper_bgcolor: '#FFFFFF',
    plot_bgcolor: '#FFFFFF',
    bargap: 0.7,        // This creates the thin look
    bargroupgap: 0.4,
    xaxis: { title: 'Month' },
    yaxis: { title: 'Admissions' },
    yaxis2: {
      title: 'Revenue (₹)',
      overlaying: 'y',
      side: 'right'
    },
    showlegend: true,
    legend: { orientation: 'h', y: -0.2 }
  }}
  style={{ width: '100%' }}
  config={{ responsive: true }}
/>

      </Box>
    </Box>
  );
}

export default AdmissionDashboard;