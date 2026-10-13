import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

/**
 * Context to manage navigation state and actions within the application.
 *
 * @type {React.Context}
 */
const NavigationContext = createContext();

/**
 * Provides navigation context to its children components.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components that will
 * receive the navigation context.
 * @returns {JSX.Element} The provider component that supplies the navigation
 * context.
 */
const readViewMode = () =>
  window.location.hash === '#desktop' ? 'desktop' : 'room';

export const NavigationProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('');
  // 'room' is the 3D scene, 'desktop' the standalone macOS-style desktop. It
  // is mirrored in the URL hash (#desktop) so it can be linked and so the
  // browser back button switches between the two.
  const [viewMode, setViewModeState] = useState(readViewMode);
  // App opened first when the desktop shows, and a pending hand-over from the
  // 3D scene (set while the screen fades out on phones and tablets).
  const [desktopApp, setDesktopApp] = useState('about');
  const [pendingDesktop, setPendingDesktop] = useState(null);

  useEffect(() => {
    const sync = () => setViewModeState(readViewMode());
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const setViewMode = useCallback((mode) => {
    // Already there (e.g. a repeated call): don't add a duplicate history entry.
    if (readViewMode() === mode) {
      setViewModeState(mode);
      return;
    }
    const url =
      mode === 'desktop'
        ? '#desktop'
        : window.location.pathname + window.location.search;
    window.history.pushState(null, '', url);
    setViewModeState(mode);
  }, []);

  const openDesktop = useCallback(
    (app = 'about') => {
      setDesktopApp(app);
      setViewMode('desktop');
    },
    [setViewMode],
  );

  return (
    <NavigationContext.Provider
      value={{
        activeSection,
        setActiveSection,
        viewMode,
        setViewMode,
        desktopApp,
        openDesktop,
        pendingDesktop,
        setPendingDesktop,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

/**
 * Custom hook to access the NavigationContext.
 *
 * This hook must be used within a NavigationProvider. If used outside of a
 * NavigationProvider, it will throw an error.
 *
 * @returns {Object} The context value from NavigationContext.
 * @throws {Error} If the hook is used outside of a NavigationProvider.
 */
export const useNavigation = () => {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
