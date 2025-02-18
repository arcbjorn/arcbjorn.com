import { Component } from 'solid-js';
import { quickAccessLinks } from '@/data/links';
import QuickLink from '@components/quickLink/QuickLink';

export const QuickAccessLinks: Component = () => {
  return (
    <div class="flex h-full flex-col items-center px-6 pt-10 sm:pt-16">
      <h3 class="text-xl font-bold sm:text-2xl">Click to copy link:</h3>
      <div class="flex-col">
        {quickAccessLinks.map(link => (
          <QuickLink link={link} copyToClipboard={true} />
        ))}
      </div>
    </div>
  );
};

export default QuickAccessLinks;
