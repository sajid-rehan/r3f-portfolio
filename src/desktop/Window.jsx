import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

const KEEP_VISIBLE = 80;
// Compact mode: gap (px) between a window and the desktop area edges.
const GAP_X = 10;
const GAP_Y = 8;

const Window = ({
  app,
  index,
  open,
  active,
  z,
  areaRef,
  area,
  compact,
  minimized,
  maximized,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  openApp,
}) => {
  const w = Math.max(Math.round(area.w * app.size[0]), 440);
  const h = Math.max(Math.round(area.h * app.size[1]), 320);
  const { Component } = app;
  // Compact hosts show every window fixed in place, inset by a small gap (or
  // edge to edge once maximized); only roomier hosts let windows be dragged.
  const inset = compact && !maximized;
  const full = maximized;
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef(null);
  const [dragging, setDragging] = useState(false);

  // Home position, relative to the desktop area (local CSS px).
  const baseX = (areaW) => areaW / 2 - w / 2 + index * 28 - 40;
  const baseY = 24 + index * 24;

  // Dragging is done by hand instead of framer's `drag`: when the desktop sits
  // on the CSS3D laptop screen, pointer deltas are in (scaled) screen pixels,
  // so they must be divided by the current screen-to-local scale.
  const onPointerDown = (e) => {
    const area = areaRef.current;
    if (!area || e.button !== 0 || full || compact) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const scale = area.getBoundingClientRect().width / area.offsetWidth || 1;
    setDragging(true);
    drag.current = {
      sx: e.clientX,
      sy: e.clientY,
      ox: offset.x,
      oy: offset.y,
      scale,
    };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    const area = areaRef.current;
    if (!d || !area) return;
    const aw = area.offsetWidth;
    const ah = area.offsetHeight;
    const x = d.ox + (e.clientX - d.sx) / d.scale;
    const y = d.oy + (e.clientY - d.sy) / d.scale;
    setOffset({
      x: Math.min(
        Math.max(x, KEEP_VISIBLE - w - baseX(aw)),
        aw - KEEP_VISIBLE - baseX(aw),
      ),
      y: Math.min(Math.max(y, -baseY), ah - 40 - baseY),
    });
  };

  const onPointerUp = () => {
    drag.current = null;
    setDragging(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`dsk-window${active ? ' active' : ''}${full ? ' max' : ''}${dragging ? ' dragging' : ''}`}
          style={{
            width: full ? area.w : inset ? area.w - 2 * GAP_X : w,
            height: full ? area.h : inset ? area.h - 2 * GAP_Y : h,
            left: full ? 0 : inset ? GAP_X : baseX(area.w) + offset.x,
            top: full ? 0 : inset ? GAP_Y : baseY + offset.y,
            zIndex: z,
            pointerEvents: minimized ? 'none' : undefined,
          }}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={
            minimized
              ? { opacity: 0, scale: 0.3, y: area.h * 0.6 }
              : { opacity: 1, scale: 1, y: 0 }
          }
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          onPointerDown={onFocus}
        >
          <div
            className='dsk-titlebar'
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onDoubleClick={onMaximize}
          >
            <div className='dsk-lights'>
              <button
                className='dsk-light close'
                aria-label='Close'
                onPointerDown={(e) => e.stopPropagation()}
                onClick={onClose}
              />
              <button
                className='dsk-light min'
                aria-label='Minimize'
                onPointerDown={(e) => e.stopPropagation()}
                onClick={onMinimize}
              />
              <button
                className='dsk-light max'
                aria-label='Maximize'
                onPointerDown={(e) => e.stopPropagation()}
                onClick={onMaximize}
              />
            </div>
            <span className='dsk-title'>{app.title}</span>
          </div>
          <div className='dsk-content'>
            <Component openApp={openApp} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Window;
