import { Component, JSX } from 'solid-js';
import Header from '@/components/header/Header';

interface LayoutProps {
  children: JSX.Element;
}

export const Layout: Component<LayoutProps> = props => {
  return (
    <main class="container mx-auto h-full">
      <script
        data-website-id="88cd3360-86f7-4497-a654-46d79f251501"
        src="https://analytics.arcbjorn.com/umami.js"
      />
      <header class="h-1/10">
        <Header />
      </header>
      <section class="h-5/6">{props.children}</section>
    </main>
  );
};

export default Layout;
