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
    title: 'Design Patterns',
    author: 'GoF',
    category: EBookCategory.SOFTWARE,
    href: 'https://www.goodreads.com/book/show/85009.Design_Patterns',
  },
  {
    title: 'Designing Data-Intensive Applications',
    author: 'M.Kleppmann',
    category: EBookCategory.SOFTWARE,
    href: 'https://www.goodreads.com/book/show/23463279-designing-data-intensive-applications',
  },
  {
    title: 'Clean Code',
    author: 'R.C.Martin',
    category: EBookCategory.SOFTWARE,
    href: 'https://www.goodreads.com/book/show/3735293-clean-code',
  },
  {
    title: 'The Mythical Man-Month',
    author: 'F.P.Brooks Jr.',
    category: EBookCategory.SOFTWARE,
    href: 'https://www.goodreads.com/book/show/13629.The_Mythical_Man_Month',
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
    title: 'The Alchemist',
    author: 'P.Coelho',
    category: EBookCategory.PSYCHOLOGY,
    href: 'https://www.goodreads.com/book/show/18144590-the-alchemist',
  },
  {
    title: 'The Talent Code',
    author: 'M.Csíkszentmihályi',
    category: EBookCategory.PSYCHOLOGY,
    href: 'https://www.goodreads.com/book/show/5771014-the-talent-code',
  },
  {
    title: 'Toward a Psychology of Being',
    author: 'A.Maslow',
    category: EBookCategory.PSYCHOLOGY,
    href: 'https://www.goodreads.com/book/show/332792.Toward_a_Psychology_of_Being#CommunityReviews',
  },
  {
    title: "Man's Search for Meaning",
    author: 'V.E.Frankl',
    category: EBookCategory.PSYCHOLOGY,
    href: 'https://www.goodreads.com/book/show/4069.Man_s_Search_for_Meaning',
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
    category: EBookCategory.MISCELLANEOUS,
    href: 'https://en.wikipedia.org/wiki/The_Legend_of_Drizzt',
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: 'D.Adams',
    category: EBookCategory.MISCELLANEOUS,
    href: 'https://www.goodreads.com/book/show/11.The_Hitchhiker_s_Guide_to_the_Galaxy',
  },
];

export default books;
