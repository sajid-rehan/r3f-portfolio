import { motion } from 'framer-motion';
import { CrossIcon } from './SvgIcons';

const CloseButton = ({ onClose }) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
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
        right: '10px',
        cursor: 'pointer',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto',
      }}
      onClick={onClose}
    >
      <CrossIcon />
    </motion.div>
  );
};

export default CloseButton;
