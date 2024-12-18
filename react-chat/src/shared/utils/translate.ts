const checkResponse = (res: Response) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

interface ITranslatedResponse {
  responseData: {
    translatedText: string;
    match: number;
  };
}

type TTranslate = (text: string, from: string, to: string) => Promise<string>;

export const translate: TTranslate = async (text, from, to) => {
  const params = new URLSearchParams();
  params.append('q', text);
  params.append('langpair', `${from}|${to}`);

  try {
    const translatedResponse: ITranslatedResponse = await checkResponse(
      await fetch(
        `https://api.mymemory.translated.net/get?${params.toString()}`,
      ),
    );

    return translatedResponse.responseData.translatedText;
  } catch (error) {
    console.error(error);
    throw new Error('Translation failed');
  }
};
