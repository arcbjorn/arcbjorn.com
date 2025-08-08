import { Component, JSX, createEffect } from 'solid-js';
import { useNavigate, useLocation } from '@solidjs/router';
import Header from '@components/Header';

import { useI18n } from '@i18n/useI18n';
import { getInitialNavPathBasedOnLanguage } from '@utils/navigation';
interface LayoutProps {
  children: JSX.Element;
}

export const Layout: Component<LayoutProps> = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useI18n();

  createEffect(() => {
    const initialPath = getInitialNavPathBasedOnLanguage(location.pathname, language());
    if (initialPath) {
      navigate(initialPath, { replace: true });
    }
  });

  return (
    <main class="container mx-auto h-screen overflow-hidden">
      <script
        defer
        src="https://analytics.arcbjorn.com/script.js"
        data-website-id="8f336108-6224-410f-8d56-8025fae879f7"
      />
      <header class="h-[10%]">
        <Header />
      </header>
      <section class="h-[90%]">{props.children}</section>
    </main>
  );
};

export default Layout;
