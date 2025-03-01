import { EBookCategory, TBook } from '@/types/types';

const books: TBook[] = [
  {
    title: 'Code Complete',
    author: 'S.McConnell',
    category: EBookCategory.SOFTWARE,
    href: 'https://github.com/manh-nguyen/ccomplete2/blob/master/Steve%20McConnell-Code%20Complete_%20A%20Practical%20Handbook%20of%20Software%20Construction.%202%20ed.-Microsoft%20Press.epub',
  },
  {
    title: 'The Art of Computer Programming',
    author: 'D.Knuth',
    category: EBookCategory.SOFTWARE,
    href: 'https://github.com/manjunath5496/The-Art-of-Computer-Programming-Books',
  },
  {
    title: 'Psycho-Cybernetics',
    author: 'M.Maltz',
    category: EBookCategory.PSYCHOLOGY,
    href: 'https://www.amazon.com/Psycho-Cybernetics-Updated-Expanded-Maxwell-Maltz/dp/0399176136',
  },
  {
    title: 'War of Art',
    author: 'S.Pressfield',
    category: EBookCategory.PSYCHOLOGY,
    href: 'https://www.amazon.com/War-Art-Winning-Creative-Battle/dp/1501260626',
  },
  {
    title: 'SGTCIY',
    author: 'C.Newport',
    category: EBookCategory.PSYCHOLOGY,
    href: 'https://www.amazon.com/Good-They-Cant-Ignore-You/dp/1455509124',
  },
  {
    title: 'Mastery',
    author: 'G.Leonard',
    category: EBookCategory.PSYCHOLOGY,
    href: 'https://www.amazon.com/Mastery-Keys-Success-Long-Term-Fulfillment/dp/0452267560',
  },
  {
    title: 'The Legend of Drizzt',
    author: 'R. A. Salvatore',
    category: EBookCategory.FANTASY,
    href: 'https://en.wikipedia.org/wiki/The_Legend_of_Drizzt',
  },
];

export default books;
