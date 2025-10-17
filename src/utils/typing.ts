export const getLanguageChars = (language: string): string => {
  switch (language) {
    case 'ru':
    case 'extra.languages.russian':
      return 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    case 'ja':
    case 'extra.languages.japanese':
      return 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
    case 'de':
    case 'extra.languages.german':
      return 'abcdefghijklmnopqrstuvwxyzäöüß';
    case 'es':
    case 'extra.languages.spanish':
      return 'abcdefghijklmnopqrstuvwxyzñáéíóúü¡¿';
    case 'pt':
    case 'extra.languages.portuguese':
      return 'abcdefghijklmnopqrstuvwxyzãõçáàâéêíóôú';
    case 'se':
    case 'extra.languages.swedish':
      return 'abcdefghijklmnopqrstuvwxyzåäö';
    default:
      return 'abcdefghijklmnopqrstuvwxyz';
  }
};

export const getRandomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
