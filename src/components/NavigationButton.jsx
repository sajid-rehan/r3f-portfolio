import { motion } from 'framer-motion';
import { NavigationIcon } from './SvgIcons';

const NavigationButton = ({ onClick }) => {
  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 10,
        },
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.6 },
      }}
      style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        cursor: 'pointer',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto',
      }}
      onClick={onClick}
    >
      <NavigationIcon />
    </motion.div>
  );
};

export default NavigationButton;
