import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import DashboardIcon from '../assets/3dicon/Productivity_Dashboard.webp'; // Import the dashboard image
import QualityControlIcon from '../assets/3dicon/Quality_control.webp'; // Import the Quality Control image
import ListIcon from '../assets/3dicon/list.webp'; // Import the list image
import SettingIcon from '../assets/3dicon/setting.webp'; // Import the settings image

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 200,
          boxSizing: 'border-box',
          backgroundColor: '#F7E8CD',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <div>
        <Typography
          variant="h6"
          gutterBottom
          style={{
            padding: '16px',
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          Library
        </Typography>
        <List>
          {/* Inquiry System */}
          <ListItem>
            <ListItemText
              primary="Inquiry System"
              primaryTypographyProps={{
                fontWeight: 'bold',
                fontSize: '14px',
                color: 'black',
              }}
            />
          </ListItem>
          <List component="div" disablePadding>
            <ListItem
              button
              component={Link}
              to="/inquiry/dashboard"
              sx={{
                pl: 4,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <img
                src={DashboardIcon}
                alt="Dashboard Icon"
                style={{ width: '24px', height: '24px', marginRight: '8px' }}
              />
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{
                  fontSize: '13px',
                  color: 'black',
                }}
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/inquiry/add-inquiry"
              sx={{
                pl: 4,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <img
                src={QualityControlIcon}
                alt="Quality Control Icon"
                style={{ width: '24px', height: '24px', marginRight: '8px' }}
              />
              <ListItemText
                primary="Add Inquiry Form"
                primaryTypographyProps={{
                  fontSize: '13px',
                  color: 'black',
                }}
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/inquiry/inquiry-list"
              sx={{
                pl: 4,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <img
                src={ListIcon}
                alt="List Icon"
                style={{ width: '24px', height: '24px', marginRight: '8px' }}
              />
              <ListItemText
                primary="Inquiry List"
                primaryTypographyProps={{
                  fontSize: '12px',
                  color: 'black',
                }}
              />
            </ListItem>
          </List>

          {/* Admission System */}
          <ListItem>
            <ListItemText
              primary="Admission System"
              primaryTypographyProps={{
                fontWeight: 'bold',
                fontSize: '14px',
                color: 'black',
              }}
            />
          </ListItem>
          <List component="div" disablePadding>
            <ListItem
              button
              component={Link}
              to="/admission/dashboard"
              sx={{
                pl: 4,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <img
                src={DashboardIcon}
                alt="Dashboard Icon"
                style={{ width: '24px', height: '24px', marginRight: '8px' }}
              />
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{
                  fontSize: '13px',
                  color: 'black',
                }}
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/admission/add-admission"
              sx={{
                pl: 4,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <img
                src={QualityControlIcon}
                alt="Quality Control Icon"
                style={{ width: '24px', height: '24px', marginRight: '8px' }}
              />
              <ListItemText
                primary="Add Admission Form"
                primaryTypographyProps={{
                  fontSize: '13px',
                  color: 'black',
                }}
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/admission/admission-list"
              sx={{
                pl: 4,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <img
                src={ListIcon}
                alt="List Icon"
                style={{ width: '24px', height: '24px', marginRight: '8px' }}
              />
              <ListItemText
                primary="Admission List"
                primaryTypographyProps={{
                  fontSize: '13px',
                  color: 'black',
                }}
              />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/admission/settings"
              sx={{
                pl: 4,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <img
                src={SettingIcon}
                alt="Setting Icon"
                style={{ width: '24px', height: '24px', marginRight: '8px' }}
              />
              <ListItemText
                primary="Admission Settings"
                primaryTypographyProps={{
                  fontSize: '13px',
                  color: 'black',
                }}
              />
            </ListItem>
          </List>
        </List>
      </div>
      
    </Drawer>
  );
}

export default Sidebar;