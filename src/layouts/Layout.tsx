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
        data-website-id="88cd3360-86f7-4497-a654-46d79f251501"
        src="https://analytics.arcbjorn.com/umami.js"
      />
      <header class="h-[10%]">
        <Header />
      </header>
      <section class="h-[90%]">{props.children}</section>
    </main>
  );
};

export default Layout;
