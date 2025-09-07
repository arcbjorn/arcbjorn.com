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
    <main class="container mx-auto flex min-h-screen flex-col overflow-hidden lg:h-screen">
      <header class="h-14 flex-none">
        <Header />
      </header>
      <section class="min-h-0 flex-1 lg:overflow-hidden">
        <div class="lg:grid lg:h-full lg:content-center lg:overflow-y-auto">{props.children}</div>
      </section>
    </main>
  );
};

export default Layout;
