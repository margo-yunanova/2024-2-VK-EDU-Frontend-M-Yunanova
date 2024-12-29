import { Card as MuiCard, Typography } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import styles from './Card.module.css';
import { FC, SyntheticEvent, ChangeEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import languages from '../../shared/languages';

interface CardProps {
  side: 'left' | 'right';
  textToTranslate?: string;
  onChangeTextToTranslate?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  translatedText?: string;
  onChangeLang: (
    side: 'left' | 'right',
  ) => (event: SyntheticEvent, lang: string) => void;
  lang: string;
}

function a11yProps(lang: string) {
  return {
    id: `tab-${lang}`,
    'aria-controls': `tabpanel-${lang}`,
  };
}

export const Card: FC<CardProps> = ({
  side,
  textToTranslate,
  onChangeTextToTranslate,
  translatedText,
  onChangeLang,
  lang,
}) => {
  const filteredLanguages = Object.entries(languages).filter(
    ([key]) =>
      key !== 'Unknown' &&
      key !== 'Autodetect' &&
      key !== 'en-US' &&
      key !== 'ru-RU',
  );

  return (
    <MuiCard
      elevation={2}
      sx={{
        height: 166,
      }}
    >
      <CardActions>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs
            value={lang}
            onChange={onChangeLang(side)}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons
          >
            {side === 'left' && (
              <Tab
                label="Detect language"
                value="Autodetect"
                {...a11yProps('Autodetect')}
              />
            )}
            <Tab label={'Русский'} value="ru-RU" {...a11yProps('ru-RU')} />
            <Tab label={'Английский'} value="en-US" {...a11yProps('en-US')} />
            {filteredLanguages.map(([key, value], i) => (
              <Tab label={value} value={key} {...a11yProps(key)} key={i} />
            ))}
          </Tabs>
        </Box>
      </CardActions>
      <CardContent>
        {side === 'left' && (
          <Typography variant="body1">
            <textarea
              className={styles.textarea}
              value={textToTranslate}
              onChange={onChangeTextToTranslate}
            ></textarea>
          </Typography>
        )}
        {side === 'right' && (
          <Typography variant="body1">
            {translatedText ? translatedText : 'Translate'}
          </Typography>
        )}
      </CardContent>
    </MuiCard>
  );
};
