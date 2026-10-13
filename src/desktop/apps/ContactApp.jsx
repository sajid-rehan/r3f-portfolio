import { motion } from 'framer-motion';
import { useState } from 'react';
import DATA from '../../data/data';

const MailIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 7L5 7.5V9l7 4.5L19 9V7.5L12 12Z' />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.200-3.400-1.200-.5-1.200-1.100-1.500-1.100-1.500-.9-.6.1-.6.1-.6 1 .1 1.500 1 1.500 1 .9 1.500 2.400 1.100 3 .8.1-.7.4-1.100.6-1.300-2.200-.3-4.600-1.100-4.600-5 0-1.100.4-2 1-2.700-.1-.3-.4-1.300.1-2.700 0 0 .8-.3 2.700 1a9.400 9.400 0 0 1 5 0c1.900-1.300 2.700-1 2.700-1 .5 1.400.2 2.400.1 2.700.6.7 1 1.600 1 2.700 0 3.900-2.300 4.700-4.600 5 .4.300.7.900.7 1.800v2.700c0 .3.2.6.7.5A10 10 0 0 0 12 2Z' />
  </svg>
);

const ContactApp = () => {
  const [copied, setCopied] = useState(false);

  const copy = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText(DATA.about.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='app-contact'>
      <div className='contact-glow' />
      <span className='contact-status'>
        <i /> Open to collaborations
      </span>
      <h2 className='contact-title'>
        Let's build something <em>together.</em>
      </h2>
      <p className='muted'>
        Have a project, an idea or an opportunity? I'd like to hear about it.
      </p>

      <div className='contact-cards'>
        <motion.a
          className='contact-card'
          href={`mailto:${DATA.about.email}`}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className='contact-ico mail'>
            <MailIcon />
          </span>
          <span className='contact-text'>
            <strong>Email</strong>
            <span className='muted'>{DATA.about.email}</span>
          </span>
          <button className='copy' onClick={copy}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </motion.a>
        <motion.a
          className='contact-card'
          href={DATA.about.github}
          target='_blank'
          rel='noreferrer'
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className='contact-ico gh'>
            <GithubIcon />
          </span>
          <span className='contact-text'>
            <strong>GitHub</strong>
            <span className='muted'>github.com/sajid-rehan</span>
          </span>
          <span className='arrow'>↗</span>
        </motion.a>
      </div>
    </div>
  );
};

export default ContactApp;
