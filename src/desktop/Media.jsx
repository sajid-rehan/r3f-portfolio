import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import SepDiagram from './SepDiagram';

const base = `${import.meta.env.BASE_URL}assets/projects/media/`;

const DIAGRAMS = { 'sep-architecture': SepDiagram };

const Item = ({ item, onZoom }) => {
  if (item.type === 'video') {
    return (
      <video
        className='media-video'
        src={base + item.src}
        poster={base + item.poster}
        autoPlay
        muted
        loop
        playsInline
        controls
        preload='metadata'
      />
    );
  }
  if (item.type === 'diagram') {
    const Diagram = DIAGRAMS[item.diagram];
    return <Diagram />;
  }
  return (
    <button
      className={`media-img ${item.fit ?? ''}`}
      onClick={() => onZoom(item)}
    >
      <img
        src={base + item.src}
        alt={item.caption}
        loading='lazy'
        draggable={false}
      />
    </button>
  );
};

/** Gallery for a project's `media` list, with a click-to-enlarge lightbox. */
const Media = ({ items }) => {
  const [zoom, setZoom] = useState(null);
  const ref = useRef(null);
  const [host, setHost] = useState(null);

  // The lightbox is portaled to the window content: ancestors animated with
  // framer-motion carry a transform, which would trap an absolute overlay.
  useEffect(() => setHost(ref.current?.closest('.dsk-content') ?? null), []);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => e.key === 'Escape' && setZoom(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom]);

  return (
    <>
      <div className='media' ref={ref}>
        {items.map((item) => (
          <figure
            key={item.src ?? item.diagram}
            className={`media-item ${item.type} ${item.fit ?? ''}`}
          >
            <Item item={item} onZoom={setZoom} />
            {item.caption && (
              <figcaption className='muted'>{item.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>
      {host &&
        createPortal(
          <AnimatePresence>
            {zoom && (
              <motion.div
                className='lightbox'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setZoom(null)}
              >
                <img
                  src={base + zoom.src}
                  alt={zoom.caption}
                  draggable={false}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          host,
        )}
    </>
  );
};

export default Media;
