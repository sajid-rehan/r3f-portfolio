import { createContext, useContext, useState } from 'react';

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
export const NavigationProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState('');

  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection }}>
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
