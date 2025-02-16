import { Component, JSX } from 'solid-js';
import Header from '@/components/header/Header';

interface LayoutProps {
  children: JSX.Element;
}

export const Layout: Component<LayoutProps> = props => {
  return (
    <main class="container mx-auto h-full">
      <header class="h-1/10">
        <Header />
      </header>
      <section class="h-5/6">{props.children}</section>
    </main>
  );
};

export default Layout;
