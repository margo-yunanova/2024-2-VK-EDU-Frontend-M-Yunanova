import { Box, Typography } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import TranslateIcon from '@mui/icons-material/Translate';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../shared/routes';
import styles from './Header.module.css';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch } from '../../shared/store';
import { clearHistory } from '../../shared/historySlice';

export const Header = () => {
  const dispatch = useAppDispatch();
  const handleClearHistory = () => {
    localStorage.removeItem('history');
    dispatch(clearHistory());
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ maxWidth: 1200 }}
      gap="10px"
    >
      <Box borderBottom="1px solid lightgray">
        <Typography variant="h6" color="textSecondary">
          VK Translate
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        gap="10px"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="row" gap="10px">
          <Link to={`/${ROUTES.TRANSLATE}`} className={styles.link}>
            <Box
              display="flex"
              flexDirection="row"
              gap="10px"
              border="1px solid lightgray"
              borderRadius="4px"
              sx={{
                backgroundColor: 'rgba(66, 133, 244, .12)',
                cursor: 'pointer',
              }}
              component="button"
              padding="10px 10px"
              alignItems="center"
            >
              <TranslateIcon sx={{ color: 'rgb(25,103,210)' }} />
              <Typography variant="subtitle2" sx={{ color: 'rgb(25,103,210)' }}>
                Text
              </Typography>
            </Box>
          </Link>
          <Link to={`/${ROUTES.HISTORY}`} className={styles.link}>
            <Box
              display="flex"
              flexDirection="row"
              gap="10px"
              border="1px solid lightgray"
              borderRadius="4px"
              sx={{
                backgroundColor: 'rgba(66, 133, 244, .12)',
                cursor: 'pointer',
              }}
              component="button"
              padding="10px 10px"
              alignItems="center"
            >
              <HistoryIcon sx={{ color: 'rgb(25,103,210)' }} />
              <Typography variant="subtitle2" sx={{ color: 'rgb(25,103,210)' }}>
                History
              </Typography>
            </Box>
          </Link>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          gap="10px"
          border="1px solid lightgray"
          borderRadius="4px"
          sx={{
            backgroundColor: 'rgba(66, 133, 244, .12)',
            cursor: 'pointer',
          }}
          component="button"
          padding="10px 10px"
          alignItems="center"
          onClick={handleClearHistory}
        >
          <ClearIcon sx={{ color: 'rgb(25,103,210)' }} />
          <Typography variant="subtitle2" sx={{ color: 'rgb(25,103,210)' }}>
            Clear History
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
