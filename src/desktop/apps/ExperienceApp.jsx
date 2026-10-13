import { motion } from 'framer-motion';
import EXPERIENCE from '../../data/experience';

const Entry = ({ e, i }) => (
  <motion.li
    className='tl-entry'
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.05 + i * 0.07 }}
  >
    <span className='tl-dot' />
    <div className='tl-head'>
      <strong>{e.role}</strong>
      <span className='tl-period'>{e.period}</span>
    </div>
    <p className='muted'>
      {e.org}
      {e.orgNote && ` (${e.orgNote})`} · {e.place}
    </p>
    {e.points && (
      <ul>
        {e.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    )}
    {e.stack && (
      <div className='chips'>
        {e.stack.map((s) => (
          <span key={s} className='chip'>
            {s}
          </span>
        ))}
      </div>
    )}
  </motion.li>
);

const Group = ({ title, entries, offset = 0 }) => (
  <section>
    <h3 className='tl-title'>{title}</h3>
    <ol className='tl'>
      {entries.map((e, i) => (
        <Entry key={e.id} e={e} i={offset + i} />
      ))}
    </ol>
  </section>
);

const ExperienceApp = () => (
  <div className='app-experience'>
    <Group title='Work experience' entries={EXPERIENCE.work} />
    <Group
      title='Education'
      entries={EXPERIENCE.education}
      offset={EXPERIENCE.work.length}
    />
  </div>
);

export default ExperienceApp;
