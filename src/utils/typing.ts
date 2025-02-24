export const getLanguageChars = (language: string): string => {
  switch (language) {
    case 'ru':
    case 'extra.languages.russian':
      return 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    case 'ja':
    case 'extra.languages.japanese':
      return 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
    case 'de':
    case 'extra.languages.german':
      return 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜß';
    case 'es':
    case 'extra.languages.spanish':
      return 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúü¡¿';
    case 'pt':
    case 'extra.languages.portuguese':
      return 'ABCDEFGHIJKLMNOPQRSTUVWXYZÃÕÇáàâãçéêíóôõú';
    case 'se':
    case 'extra.languages.swedish':
      return 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖåäö';
    default:
      return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
};

export const getRandomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
