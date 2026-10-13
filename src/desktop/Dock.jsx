import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const BASE = 52;
const MAX = 80;
const RANGE = 130;
const COMPACT_SIZE = 42;

const DockIcon = ({ app, mouseX, isOpen, isActive, compact, onLaunch }) => {
  const ref = useRef(null);
  const distance = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: BASE };
    return x - b.x - b.width / 2;
  });
  const size = useSpring(
    useTransform(distance, [-RANGE, 0, RANGE], [BASE, MAX, BASE]),
    { mass: 0.1, stiffness: 180, damping: 14 },
  );

  return (
    <div className='dsk-dock-item'>
      <motion.button
        ref={ref}
        className='dsk-dock-icon'
        style={{
          width: compact ? COMPACT_SIZE : size,
          height: compact ? COMPACT_SIZE : size,
          background: `linear-gradient(160deg, ${app.color[0]}, ${app.color[1]})`,
        }}
        onClick={() => onLaunch(app.id)}
        whileTap={{ scale: 0.9 }}
        aria-label={app.title}
      >
        <svg viewBox='0 0 24 24' fill='#fff'>
          <path d={app.icon} />
        </svg>
        <span className='dsk-dock-tip'>{app.title}</span>
      </motion.button>
      {compact && (
        <span className={`dsk-dock-label${isActive ? ' on' : ''}`}>
          {app.short ?? app.title}
        </span>
      )}
      <span className={`dsk-dock-dot${isOpen ? ' on' : ''}`} />
    </div>
  );
};

// Not an app: leaves the desktop and returns to the 3D room.
const ROOM = {
  id: 'room',
  title: 'Back to the 3D room',
  short: 'Room',
  color: ['#bf5af2', '#5e5ce6'],
  icon: 'M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.200L18.300 7.700 12 11.200 5.700 7.700 12 4.200ZM5 9.400l6 3.300v6.600l-6-3.300V9.400Zm8 9.900v-6.600l6-3.300v6.600l-6 3.300Z',
};

const Dock = ({ apps, openIds, activeId, onLaunch, onExit, compact }) => {
  const mouseX = useMotionValue(-1000);

  return (
    <motion.div
      className='dsk-dock'
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(-1000)}
    >
      {apps.map((app) => (
        <DockIcon
          key={app.id}
          app={app}
          mouseX={mouseX}
          isOpen={openIds.includes(app.id)}
          isActive={activeId === app.id}
          compact={compact}
          onLaunch={onLaunch}
        />
      ))}
      {onExit && (
        <>
          <span className='dsk-dock-sep' />
          <DockIcon
            app={ROOM}
            mouseX={mouseX}
            isOpen={false}
            compact={compact}
            onLaunch={onExit}
          />
        </>
      )}
    </motion.div>
  );
};

export default Dock;
