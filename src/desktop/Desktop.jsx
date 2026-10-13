import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { COMPACT_BELOW } from '../util/viewport';
import APPS from './apps';
import Dock from './Dock';
import MenuBar from './MenuBar';
import Window from './Window';
import './desktop.css';

/**
 * macOS-style desktop. Fills its parent, so it can be hosted anywhere (preview
 * page, 3D laptop screen, mobile overlay).
 *
 * @param {Object} props
 * @param {string[]} [props.initialApps] App ids opened on mount.
 * @param {string} [props.focusApp] App id to open/focus whenever it changes.
 * @param {Function} [props.onExit] Shows a "Room" dock icon that calls this.
 */
const Desktop = ({ initialApps = [], focusApp, onExit }) => {
  const areaRef = useRef(null);
  const [area, setArea] = useState({ w: 1440, h: 900 });
  // Narrow hosts (phones, small tablets) get full-screen apps and a tab-bar dock.
  const compact = area.w < COMPACT_BELOW;
  const zCounter = useRef(initialApps.length + 1);
  const [wins, setWins] = useState(() =>
    Object.fromEntries(
      initialApps.map((id, i) => [id, { open: true, z: i + 1 }]),
    ),
  );
  const [activeId, setActiveId] = useState(initialApps.at(-1) ?? null);

  // Opens, restores (if minimized) and raises an app.
  const focus = useCallback((id) => {
    zCounter.current += 1;
    const z = zCounter.current;
    setWins((w) => ({ ...w, [id]: { ...w[id], open: true, min: false, z } }));
    setActiveId(id);
  }, []);

  const minimize = useCallback((id) => {
    setWins((w) => ({ ...w, [id]: { ...w[id], min: true } }));
    setActiveId((a) => (a === id ? null : a));
  }, []);

  const toggleMax = useCallback((id) => {
    setWins((w) => ({ ...w, [id]: { ...w[id], max: !w[id]?.max } }));
  }, []);

  // Dock click: minimize the focused app, otherwise open/restore/raise it.
  const toggle = useCallback(
    (id) => {
      const w = wins[id];
      if (!compact && w?.open && !w.min && activeId === id) minimize(id);
      else focus(id);
    },
    [wins, activeId, compact, focus, minimize],
  );

  const close = useCallback((id) => {
    setWins((w) => ({
      ...w,
      [id]: { ...w[id], open: false, min: false, max: false },
    }));
    setActiveId((a) => (a === id ? null : a));
  }, []);

  useLayoutEffect(() => {
    const el = areaRef.current;
    const measure = () => setArea({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (focusApp && APPS.some((a) => a.id === focusApp)) focus(focusApp);
  }, [focusApp, focus]);

  const activeApp = APPS.find((a) => a.id === activeId);

  return (
    <div className={`dsk${compact ? ' compact' : ''}`}>
      <MenuBar appTitle={activeApp?.title ?? 'Finder'} />
      <div className='dsk-area' ref={areaRef}>
        {APPS.map((app, i) => (
          <Window
            key={app.id}
            app={app}
            index={i}
            open={!!wins[app.id]?.open}
            minimized={!!wins[app.id]?.min}
            maximized={!!wins[app.id]?.max}
            active={activeId === app.id}
            z={wins[app.id]?.z ?? 0}
            areaRef={areaRef}
            area={area}
            compact={compact}
            onFocus={() => focus(app.id)}
            onClose={() => close(app.id)}
            onMinimize={() => minimize(app.id)}
            onMaximize={() => toggleMax(app.id)}
            openApp={focus}
          />
        ))}
      </div>
      <Dock
        apps={APPS}
        openIds={Object.keys(wins).filter((id) => wins[id].open)}
        activeId={activeId}
        onLaunch={toggle}
        onExit={onExit}
        compact={compact}
      />
    </div>
  );
};

export default Desktop;
