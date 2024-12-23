import { Card as MuiCard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import styles from './Card.module.css';
import { FC, SyntheticEvent, useState, ChangeEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
  const [age, setAge] = useState('');

  const handleSelect = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

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
          >
            {side === 'left' && (
              <Tab
                label="Default language"
                value="Autodetect"
                {...a11yProps('Autodetect')}
              />
            )}
            <Tab label="Русский" value="ru" {...a11yProps('ru')} />
            <Tab label="Английский" value="en" {...a11yProps('en')} />

            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={age}
              label="Age"
              onChange={handleSelect}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Tabs>
        </Box>
      </CardActions>
      <CardContent>
        {side === 'left' && (
          <textarea
            className={styles.textarea}
            value={textToTranslate}
            onChange={onChangeTextToTranslate}
          ></textarea>
        )}
        {side === 'right' && (
          <p>{translatedText ? translatedText : 'Translate'}</p>
        )}
      </CardContent>
    </MuiCard>
  );
};
