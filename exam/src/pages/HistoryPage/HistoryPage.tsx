import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { Fragment, useState } from 'react';
import { Box } from '@mui/material';
import languages from '../../shared/languages';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface HistoryItem {
  from: keyof typeof languages;
  to: keyof typeof languages;
  textToTranslate: string;
  translatedText: string;
}

export const HistoryPage = () => {
  const [history, setHistory] = useState<HistoryItem[]>(
    JSON.parse(localStorage.getItem('history') ?? '[]'),
  );

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
