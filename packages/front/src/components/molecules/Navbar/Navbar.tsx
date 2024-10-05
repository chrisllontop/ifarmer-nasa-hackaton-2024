import * as React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import viteLogo from '../../../assets/psychiatry.svg'

function Navbar() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  function handleNavigation (value, newValue) {
    setValue(newValue)
    navigate(newValue)
  }

  return (
    <Box sx={{ width: 500 }} >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          handleNavigation(event, newValue)
        }}
      >
        <BottomNavigationAction value='/search' label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction value='/crops' label="Crops" icon={<img src={viteLogo} alt="Vite logo" />} />
        <BottomNavigationAction value='/alerts' label="Alerts" icon={<NotificationsNoneIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default Navbar;
