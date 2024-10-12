import { createContext, useContext, useState } from 'react';

/**
 * Context to manage animation state.
 * 
 * @type {React.Context}
 */
const AnimationContext = createContext();

/**
 * Provides animation state and controls to its children components.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components that will have
 * access to the animation context.
 * @returns {JSX.Element} The provider component that wraps its children with
 * animation context.
 */
export const AnimationProvider = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <AnimationContext.Provider value={{ isAnimating, setIsAnimating }}>
      {children}
    </AnimationContext.Provider>
  );
};

/**
 * Custom hook to access the AnimationContext.
 * 
 * This hook must be used within an AnimationProvider. If used outside of an
 * AnimationProvider, it will throw an error.
 * 
 * @returns {Object} The current context value for AnimationContext.
 * @throws {Error} If the hook is used outside of an AnimationProvider.
 */
export const useAnimationContext = () => {
  const context = useContext(AnimationContext);

  if (context === undefined) {
    throw new Error(
      'useAnimationContext must be used within an AnimationProvider',
    );
  }
  return context;
};
