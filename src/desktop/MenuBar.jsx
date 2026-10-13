import { useEffect, useState } from 'react';

const formatClock = (d) =>
  d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }) +
  '  ' +
  d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

const MenuBar = ({ appTitle }) => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className='dsk-menubar'>
      <div className='dsk-menubar-left'>
        <span className='dsk-apple'>
          <svg viewBox='0 0 24 24' width='14' height='14' fill='currentColor'>
            <path d='M12 1.5 21.100 6.750v10.500L12 22.500 2.900 17.250V6.750Z' />
          </svg>
        </span>
        <strong>{appTitle}</strong>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Window</span>
        <span>Help</span>
      </div>
      <div className='dsk-menubar-right'>{formatClock(now)}</div>
    </div>
  );
};

export default MenuBar;
