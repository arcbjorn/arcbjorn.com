import { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { useI18n } from '@i18n/useI18n';
import ThemeToggle from '@components/ThemeToggle';
import LanguageSwitch from '@components/LanguageSwitch';
import TimeZone from '@components/TimeZone';
import { Ei18nToken } from '@i18n/types';

enum Route {
  about = '/',
  extra = '/extra',
}

export const Header: Component = () => {
  const { t } = useI18n();

  return (
    <div class="flex flex-wrap items-center justify-between py-7">
      <A class="cursor-pointer px-7 text-xl font-bold" href={Route.about}>
        {t(Ei18nToken.NAME)}
      </A>
      <TimeZone />
      <div class="flex flex-wrap items-center justify-around pl-2 text-base sm:text-lg">
        <div class="hidden sm:flex">
          <A
            class="relative mx-4 inline-block text-[var(--color)] no-underline after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[var(--color)] after:transition-transform after:duration-[400ms] after:ease-[cubic-bezier(0.86,0,0.07,1)] after:content-[''] hover:after:origin-bottom-left hover:after:scale-x-100"
            activeClass="after:content-[''] after:absolute after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-[var(--color)] after:scale-x-100 after:origin-bottom-left"
            href={Route.about}
          >
            {t(Ei18nToken.ABOUT)}
          </A>
          <A
            class="relative mx-4 inline-block text-[var(--color)] no-underline after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[var(--color)] after:transition-transform after:duration-[400ms] after:ease-[cubic-bezier(0.86,0,0.07,1)] after:content-[''] hover:after:origin-bottom-left hover:after:scale-x-100"
            activeClass="after:content-[''] after:absolute after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-[var(--color)] after:scale-x-100 after:origin-bottom-left"
            href={Route.extra}
          >
            {t(Ei18nToken.EXTRA)}
          </A>
        </div>
        <LanguageSwitch />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
