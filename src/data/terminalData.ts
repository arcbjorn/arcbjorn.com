interface ICompany {
  name: string;
  link: string;
}

export const previousCompanies: ICompany[] = [
  { name: 'FundraiseUp', link: 'https://www.fundraiseup.com/' },
  { name: 'Muffins', link: 'https://muffins.io/' },
];

export const currentCompany: ICompany = {
  name: 'Sardine',
  link: 'https://www.sardine.ai/',
};
