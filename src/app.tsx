import 'src/global.css';

import { useEffect } from 'react';
// import { AuthProvider } from 'src/auth/context/jwt';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { usePathname } from 'src/routes/hooks';

import { themeConfig, ThemeProvider } from 'src/theme';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { UserProvider } from './contexts/UserContext';
import { ConfigProvider } from './contexts/ConfigContext';

// ----------------------------------------------------------------------

type AppProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export default function App({ children }: AppProps) {

  useScrollToTop();

  return (
    // <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <UserProvider>
          <SettingsProvider defaultSettings={defaultSettings}>
            <ThemeProvider
              modeStorageKey={themeConfig.modeStorageKey}
              defaultMode={themeConfig.enableSystemMode ? 'system' : themeConfig.defaultMode}
            >
              <MotionLazy>
                <ProgressBar />
                <SettingsDrawer defaultSettings={defaultSettings} />
                {children}
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </UserProvider>
      </ConfigProvider>
    </QueryClientProvider>
    // </AuthProvider>
  );
}

// ----------------------------------------------------------------------

function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
