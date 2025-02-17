import { Component, JSX } from 'solid-js';
import { useNavigate, useLocation } from '@solidjs/router';
import { Language } from '@i18n/useI18n';
import Header from '@/components/header/Header';

interface LayoutProps {
  children: JSX.Element;
}

export const Layout: Component<LayoutProps> = props => {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;
  const langMatch = path.match(/^\/([a-z]{2})(\/|$)/);
  const urlLang = langMatch?.[1];

  if (urlLang && !Object.values(Language).includes(urlLang as Language)) {
    const newPath = path.replace(/^\/[a-z]{2}/, '');
    navigate(newPath, { replace: true });
  }

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
