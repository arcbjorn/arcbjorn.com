import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, screen } from '@solidjs/testing-library';
import LanguageSwitch from '@components/LanguageSwitch';
import { Router, Route } from '@solidjs/router';
import { Language } from '@i18n/useI18n';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock navigation
const navigateMock = vi.fn();
vi.mock('@solidjs/router', async () => {
  const actual = await vi.importActual('@solidjs/router');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => ({ pathname: '/test' }),
  };
});

// Mock i18n
vi.mock('@i18n/useI18n', async () => {
  const actual = await vi.importActual('@i18n/useI18n');
  return {
    ...actual,
    useI18n: () => ({
      t: (key: string) => key,
      language: () => Language.EN,
      setLanguage: vi.fn(),
    }),
  };
});

// Mock the navigation utility
vi.mock('@utils/navigation', () => ({
  getNavPathOnLanguageChange: vi.fn((pathname: string, lang: string) => `/${lang}${pathname}`),
}));

describe('LanguageSwitch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('should render initial state correctly', () => {
    render(() => (
      <Router>
        <Route path="/" component={LanguageSwitch} />
      </Router>
    ));

    const button = screen.getByText('EN');
    expect(button).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should handle dropdown toggle', async () => {
    render(() => (
      <Router>
        <Route path="/" component={LanguageSwitch} />
      </Router>
    ));

    const button = screen.getByText('EN');

    // Open dropdown
    await fireEvent.click(button);
    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();

    // Close dropdown
    await fireEvent.click(button);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should handle click outside', async () => {
    render(() => (
      <Router>
        <Route path="/" component={LanguageSwitch} />
      </Router>
    ));

    await fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await fireEvent.click(document.body);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('should maintain accessibility attributes', async () => {
    render(() => (
      <Router>
        <Route path="/" component={LanguageSwitch} />
      </Router>
    ));

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'aria_label.select_language');

    await fireEvent.click(button);
    const options = screen.getAllByRole('option');

    options.forEach(option => {
      expect(option).toHaveAttribute('aria-selected');
    });
  });

  it('should cleanup event listeners on unmount', () => {
    const { unmount } = render(() => (
      <Router>
        <Route path="/" component={LanguageSwitch} />
      </Router>
    ));

    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});
