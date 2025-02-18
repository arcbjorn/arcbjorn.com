import { Component } from 'solid-js';
import { quickAccessLinks } from '@/data/links';
import QuickLink from '@components/quickLink/QuickLink';

export const QuickLinks: Component = () => {
  return (
    <div class="quickLinks">
      {quickAccessLinks.map(link => (
        <QuickLink link={link} copyToClipboard={false} />
      ))}
    </div>
  );
};

export default QuickLinks;
