import { createContext, useContext, useState } from 'react';

/**
 * Context for managing OrbitControls state and functionality.
 *
 * @type {React.Context}
 */
const OrbitControlsContext = createContext();

/**
 * Provides a context for managing the state of OrbitControls.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have
 * access to the context.
 * @returns {JSX.Element} The provider component that wraps its children with
 * the OrbitControls context.
 */
export const OrbitControlsProvider = ({ children }) => {
  const [controlsEnabled, setControlsEnabled] = useState(false);

  return (
    <OrbitControlsContext.Provider
      value={{ controlsEnabled, setControlsEnabled }}
    >
      {children}
    </OrbitControlsContext.Provider>
  );
};

/**
 * Custom hook to access the OrbitControls context.
 *
 * This hook must be used within an OrbitControlsProvider. If used outside of
 * the provider, it will throw an error.
 *
 * @returns {Object} The context value of OrbitControls.
 * @throws {Error} If the hook is used outside of an OrbitControlsProvider.
 */
export const useOrbitControls = () => {
  const context = useContext(OrbitControlsContext);

  if (context === undefined) {
    throw new Error(
      'useOrbitControls must be used within an OrbitControlsProvider',
    );
  }
  return context;
};
