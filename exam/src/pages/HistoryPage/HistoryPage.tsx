import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { Fragment, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import languages from '../../shared/languages';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { updateHistory } from '../../shared/historySlice';
import { useAppDispatch, useAppSelector } from '../../shared/store';

interface HistoryItem {
  from: keyof typeof languages;
  to: keyof typeof languages;
  textToTranslate: string;
  translatedText: string;
}

export const HistoryPage = () => {
  const [history] = useState<HistoryItem[]>(
    JSON.parse(localStorage.getItem('history') ?? '[]'),
  );

  const isHistoryEmpty = useAppSelector(
    (state) => state.history.isHistoryEmpty,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (history.length > 0) {
      dispatch(updateHistory());
    }
  });

  const getFullLanguagesName = (
    from: keyof typeof languages,
    to: keyof typeof languages,
  ) => {
    const fromName =
      languages[from] ??
      languages[
        (Object.keys(languages).find((k) => k.includes(from)) ??
          'Unknown') as keyof typeof languages
      ];

    const toName = languages[to];

    return (
      <Box display="flex" alignItems="center" gap="5px">
        {fromName} <ArrowForwardIcon fontSize="small" /> {toName}
      </Box>
    );
  };

  return (
    <Box width={'100%'} height={'100%'} overflow={'auto'}>
      {isHistoryEmpty && (
        <Box display="flex" width="100%">
          <Typography variant="h6">History is empty</Typography>
        </Box>
      )}
      <List>
        {history.map(({ from, to, textToTranslate, translatedText }, i) => (
          <Fragment key={i}>
            <ListItem
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor:
                  i % 2 === 0 ? 'transparent' : 'rgba(66, 133, 244, .12)',
              }}
              alignItems="flex-start"
            >
              <ListItemText primary={getFullLanguagesName(from, to)} />
              <ListItemText
                primary={textToTranslate}
                secondary={translatedText}
              />
            </ListItem>
            <Divider variant="fullWidth" component="li" />
          </Fragment>
        ))}
      </List>
    </Box>
  );
};
