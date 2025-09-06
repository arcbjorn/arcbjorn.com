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
    <main class="container mx-auto min-h-screen lg:h-screen flex flex-col overflow-hidden">
      <header class="flex-none h-14">
        <Header />
      </header>
      <section class="flex-1 min-h-0 lg:overflow-hidden">
        <div class="lg:h-full lg:overflow-y-auto lg:grid lg:content-center">
          {props.children}
        </div>
      </section>
    </main>
  );
};

export default Layout;
