import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import PROJECTS from '../../data/projects';
import Media from '../Media';
import ProjectIcon from '../ProjectIcon';

const isPublic = (p) => p.links.length > 0;

const GROUPS = [
  {
    title: 'Projects',
    items: [
      { label: 'All', test: () => true },
      { label: 'University', test: (p) => p.kind === 'University project' },
      { label: 'Personal', test: (p) => p.kind === 'Personal project' },
    ],
  },
  {
    title: 'Repository',
    items: [
      { label: 'Public', test: isPublic },
      { label: 'Not public', test: (p) => !isPublic(p) },
    ],
  },
];

const Card = ({ p, onOpen }) => (
  <motion.button
    className='pcard'
    onClick={() => onOpen(p)}
    whileHover={{ y: -3 }}
  >
    <ProjectIcon project={p} />
    <strong>{p.name}</strong>
    <span className='muted'>
      {p.kind} · {p.period}
    </span>
    <span className='pcard-tag'>{p.tagline}</span>
  </motion.button>
);

const Detail = ({ p, onBack }) => (
  <motion.div
    className='pdetail'
    initial={{ opacity: 0, x: 24 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 24 }}
  >
    <button className='btn ghost small' onClick={onBack}>
      ‹ All projects
    </button>
    <div className='pdetail-head'>
      <ProjectIcon project={p} size={60} />
      <div>
        <h2>{p.name}</h2>
        <p className='muted'>
          {p.kind} · {p.period} · {p.role}
        </p>
      </div>
    </div>
    <p>{p.description}</p>
    <ul>
      {p.highlights.map((h) => (
        <li key={h}>{h}</li>
      ))}
    </ul>
    {p.media && <Media items={p.media} />}
    <div className='chips'>
      {p.stack.map((s) => (
        <span key={s} className='chip'>
          {s}
        </span>
      ))}
    </div>
    <div className='pdetail-links'>
      {p.links.map((l) => (
        <a
          key={l.href}
          className='btn'
          href={l.href}
          target='_blank'
          rel='noreferrer'
        >
          {l.label} ↗
        </a>
      ))}
      {p.note && <span className='muted'>{p.note}</span>}
    </div>
  </motion.div>
);

const ProjectsApp = () => {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const active = GROUPS.flatMap((g) => g.items).find((i) => i.label === filter);
  const list = PROJECTS.filter(active.test);

  return (
    <div className='app-projects'>
      <aside className='sidebar'>
        {GROUPS.map((g) => (
          <div key={g.title} className='side-group'>
            <h4>{g.title}</h4>
            {g.items.map(({ label, test }) => (
              <button
                key={label}
                className={`side-item${filter === label ? ' on' : ''}`}
                onClick={() => {
                  setFilter(label);
                  setSelected(null);
                }}
              >
                <span>{label}</span>
                <span className='count'>{PROJECTS.filter(test).length}</span>
              </button>
            ))}
          </div>
        ))}
      </aside>
      <main className='pmain'>
        <AnimatePresence mode='wait'>
          {selected ? (
            <Detail
              key={selected.id}
              p={selected}
              onBack={() => setSelected(null)}
            />
          ) : (
            <motion.div
              key='grid'
              className='pgrid'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {list.map((p) => (
                <Card key={p.id} p={p} onOpen={setSelected} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ProjectsApp;
