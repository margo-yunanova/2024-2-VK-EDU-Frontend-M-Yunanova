import { Card } from '../../components/Card/Card';
import { Grid2 as Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useTranslateQuery } from '../../shared/api';

export const TranslatePage = () => {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [debouncedTextToTranslate] = useDebounce(textToTranslate, 500);
  const [languages, setLanguages] = useState({
    from: 'Autodetect',
    to: 'en',
  });

  const { data } = useTranslateQuery(
    {
      text: debouncedTextToTranslate,
      from: languages.from,
      to: languages.to,
    },
    {
      skip: !debouncedTextToTranslate,
    },
  );

  useEffect(() => {
    const history = localStorage.getItem('history');
    localStorage.setItem(
      'history',
      JSON.stringify([
        ...JSON.parse(history || '[]'),
        {
          text: debouncedTextToTranslate,
          from: languages.from,
          to: languages.to,
        },
      ]),
    );
  }, [debouncedTextToTranslate]);

  const handleLanguageChange =
    (side: 'left' | 'right') => (event: SyntheticEvent, lang: string) => {
      setLanguages({
        ...languages,
        [side === 'left' ? 'from' : 'to']: lang,
      });
    };

  console.log(languages);

  const handleChangeTextToTranslate = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextToTranslate(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 1200 }}>
      <Grid container>
        <Grid size={6}>
          <Card
            side="left"
            textToTranslate={textToTranslate}
            onChangeTextToTranslate={handleChangeTextToTranslate}
            onChangeLang={handleLanguageChange}
            lang={languages.from}
          />
        </Grid>
        <Grid size={6}>
          <Card
            side="right"
            translatedText={data?.responseData?.translatedText}
            onChangeLang={handleLanguageChange}
            lang={languages.to}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
