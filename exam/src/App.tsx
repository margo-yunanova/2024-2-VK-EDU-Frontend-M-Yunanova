import './App.css';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Box } from '@mui/material';

function App() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ flexGrow: 1, maxWidth: 1200 }}
      gap="10px"
    >
      <Header />
      <Outlet />
    </Box>
  );
}

export default App;
