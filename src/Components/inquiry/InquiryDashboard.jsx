import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import Plot from 'react-plotly.js';
import {
  getInquiryCounts,
  getMonthlyInquiryCount,
  getDailyInquiryCounts,
} from '../inquiry/Service/addInquiryForm';

const InquiryCard = ({ title, value, background }) => (
  <Card sx={{ width: 220, backgroundColor: background, borderRadius: 2, boxShadow: 3 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" fontWeight="bold">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

function InquiryDashboard() {
  const currentDate = new Date();
  const [counts, setCounts] = useState({
    total: 0,
    today: 0,
    last30Days: 0,
    last365Days: 0,
  });

  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [dailyYear, setDailyYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);

  const [monthlyData, setMonthlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  const lastFiveYears = Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString('default', { month: 'short' }),
  }));

  useEffect(() => {
    getInquiryCounts().then((data) => {
      setCounts({
        total: data.totalCount || 0,
        today: data.todayCount || 0,
        last30Days: data.last30DaysCount || 0,
        last365Days: data.last365DaysCount || 0,
      });
    });
  }, []);

  useEffect(() => {
    Promise.all(
      Array.from({ length: 12 }, (_, i) =>
        getMonthlyInquiryCount(selectedYear, i + 1).then((count) => ({
          month: new Date(selectedYear, i).toLocaleString('default', { month: 'short' }),
          count: count || 0,
        }))
      )
    ).then(setMonthlyData);
  }, [selectedYear]);

  useEffect(() => {
    getDailyInquiryCounts(dailyYear, selectedMonth).then((data) => {
      const formatted = Object.entries(data).map(([dateStr, count]) => {
        const day = new Date(dateStr).getDate();
        return {
          day: `Day ${day}`,
          count: count || 0,
        };
      });
      setDailyData(formatted);
    });
  }, [dailyYear, selectedMonth]);

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item>
          <InquiryCard title="Total Inquiries" value={counts.total} background="#FFFBE6" />
        </Grid>
        <Grid item>
          <InquiryCard title="Today" value={counts.today} background="#F7E8CD" />
        </Grid>
        <Grid item>
          <InquiryCard title="Last 30 Days" value={counts.last30Days} background="#E6B17A" />
        </Grid>
        <Grid item>
          <InquiryCard title="Last 365 Days" value={counts.last365Days} background="#D9A066" />
        </Grid>
      </Grid>

      {/* Monthly Inquiry Chart */}
      <Box sx={{ mt: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
          <Typography variant="h6">Monthly Inquiry Count</Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel
              id="year-select-label"
              sx={{
                backgroundColor: '#FFFBE6',
                px: 0.5,
                color: 'black',
                '&.Mui-focused': { color: 'black' },
              }}
            >
              Year
            </InputLabel>
            <Select
              labelId="year-select-label"
              value={selectedYear}
              label="Year"
              onChange={(e) => setSelectedYear(e.target.value)}
              sx={{
                backgroundColor: '#FFFBE6',
                borderRadius: 1,
                boxShadow: 1,
                color: 'black',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
                '& .MuiSelect-select': {
                  padding: '8px 14px',
                  color: 'black',
                },
              }}
            >
              {lastFiveYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Plot
          data={[
            {
              type: 'bar',
              x: monthlyData.map((d) => d.month),
              y: monthlyData.map((d) => d.count),
              marker: {
                color: '#F7A072',
                line: { width: 1.5, color: '#E86A33' },
              },
              name: 'Monthly Inquiries',
            },
          ]}
          layout={{
            title: `Monthly Inquiry Count - ${selectedYear}`,
            height: 400,
            bargap: 0.2,
            paper_bgcolor: '#fefefe',
            plot_bgcolor: '#fefefe',
            xaxis: { title: 'Month' },
            yaxis: { title: 'Inquiries' },
          }}
          style={{ width: '100%' }}
        />
      </Box>

      {/* Daily Inquiry Chart */}
      <Box sx={{ mt: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
          <Typography variant="h6">Daily Inquiry Count</Typography>

          {/* Year Selector for Daily Chart */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel
              id="daily-year-select-label"
              sx={{
                backgroundColor: '#FFFBE6',
                px: 0.5,
                color: 'black',
                '&.Mui-focused': { color: 'black' },
              }}
            >
              Year
            </InputLabel>
            <Select
              labelId="daily-year-select-label"
              value={dailyYear}
              label="Year"
              onChange={(e) => setDailyYear(e.target.value)}
              sx={{
                backgroundColor: '#FFFBE6',
                borderRadius: 1,
                boxShadow: 1,
                color: 'black',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
                '& .MuiSelect-select': {
                  padding: '8px 14px',
                  color: 'black',
                },
              }}
            >
              {lastFiveYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Month Selector for Daily Chart */}
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel
              id="month-select-label"
              sx={{
                backgroundColor: '#FFFBE6',
                px: 0.5,
                color: 'black',
                '&.Mui-focused': { color: 'black' },
              }}
            >
              Month
            </InputLabel>
            <Select
              labelId="month-select-label"
              value={selectedMonth}
              label="Month"
              onChange={(e) => setSelectedMonth(e.target.value)}
              sx={{
                backgroundColor: '#FFFBE6',
                borderRadius: 1,
                boxShadow: 1,
                color: 'black',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'black' },
                '& .MuiSelect-select': {
                  padding: '8px 14px',
                  color: 'black',
                },
              }}
            >
              {months.map((m) => (
                <MenuItem key={m.value} value={m.value}>
                  {m.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Plot
  data={[
    {
      type: 'scatter',
      mode: 'lines+markers',
      x: dailyData.map((d) => d.day),
      y: dailyData.map((d) => d.count),
      line: {
        color: '#FFA726',
        width: 3,
        shape: 'spline', // smooth curve
      },
      marker: {
        color: '#E65100',
        size: 6,
      },
      name: 'Daily Inquiries',
    },
  ]}
  layout={{
    title: `Daily Inquiry Count - ${months[selectedMonth - 1].label} ${dailyYear}`,
    height: 400,
    paper_bgcolor: '#fefefe',
    plot_bgcolor: '#fefefe',
    xaxis: {
      title: 'Day',
      tickangle: -45,
      automargin: true,
    },
    yaxis: {
      title: 'Inquiries',
      rangemode: 'tozero',
    },
    margin: { l: 50, r: 30, t: 50, b: 80 },
  }}
  style={{ width: '100%' }}
  config={{ responsive: true }}
/>




      </Box>
    </Box>
  );
}

export default InquiryDashboard;
