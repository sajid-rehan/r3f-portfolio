import { motion } from 'framer-motion';
import DATA from '../../data/data';

const { about } = DATA;

const AboutApp = ({ openApp }) => (
  <div className='app-about'>
    <div className='about-hero'>
      <motion.img
        className='about-photo'
        src='./assets/profile.svg'
        alt={about.name}
        draggable={false}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
      <div className='about-intro'>
        <h2>{about.name}</h2>
        <p className='about-role'>{about.role}</p>
        <p className='about-bio'>{about.bio}</p>
        <div className='about-actions'>
          <button className='btn' onClick={() => openApp('projects')}>
            View projects
          </button>
          <button className='btn ghost' onClick={() => openApp('experience')}>
            Experience
          </button>
          <button className='btn ghost' onClick={() => openApp('contact')}>
            Get in touch
          </button>
        </div>
      </div>
    </div>
    <div className='about-focus'>
      {about.focus.map((f, i) => (
        <motion.div
          key={f.title}
          className='focus-card'
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.06 }}
        >
          <strong>{f.title}</strong>
          <span className='muted'>{f.text}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

export default AboutApp;
