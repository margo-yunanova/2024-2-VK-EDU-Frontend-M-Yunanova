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

  const response: ITranslatedResponse = await (
    await fetch(`https://api.mymemory.translated.net/get?${params.toString()}`)
  ).json();

  return response.responseData.translatedText;
};
