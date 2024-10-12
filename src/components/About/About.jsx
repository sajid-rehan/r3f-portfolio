import { motion } from 'framer-motion';
import React from 'react';
import DATA from './../../data/data';
import { notifyInfo } from './../../util/notify';
import {
  Blender,
  C,
  ChaosIcon,
  Cpp,
  Git,
  Github,
  Java,
  Javascript,
  Mail,
  NodeJs,
  PHP,
  Python,
  ReactJs,
  SQL,
  ThreeJs,
  Typescript,
} from './../SvgIcons';
import './About.css';
import ArrowComponent from './ArrowComponent';
import Terminal from './Terminal';

const About = () => {
  return (
    <div className='container'>
      <AboutContent />
      <Skills />
      <Projects />
    </div>
  );
};

const AboutContent = () => {
  return (
    <div className='about-section'>
      <div className='about-content'>
        <div className='about-left'>
          <img
            src={'./assets/profile.svg'}
            alt='profile'
            className='profile-img'
          />
          <ChaosIcon />
          <h1 className='name'>Hi {'\u{1F44B}'}, I'm Rehan</h1>
          <ArrowComponent />
        </div>
        <div className='about-right'>
          <Terminal text={DATA.about.aboutMe} />
          <div className='contact'>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href={DATA.about.github}
              target='_blank'
            >
              <Github />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              target='_blank'
              onClick={() => {
                navigator.clipboard.writeText(DATA.about.email);
                notifyInfo(DATA.notifications.emailCopied, 10000);
              }}
              style={{
                cursor: 'pointer',
              }}
            >
              <Mail />
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <div className='skills-section'>
      <div className='skills-container'>
        <div className='skill-heading-container'>
          <h1 className='skill-heading'>
            SKILL<span className='last-letter'>S</span>
          </h1>
        </div>
        <div className='logos-slide-container'>
          <div className='logos-slide'>
            <Java />
            <Python />
            <C />
            <Cpp />
            <PHP />
            <Javascript />
            <Typescript />
            <SQL />
            <ThreeJs />
            <ReactJs />
            <NodeJs />
            <Git />
            <Blender />
            <Java />
            <Python />
            <C />
            <Cpp />
            <PHP />
            <Javascript />
            <Typescript />
            <SQL />
            <ThreeJs />
            <ReactJs />
            <NodeJs />
            <Git />
            <Blender />
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <div className='projects-section'>
      <h1>Projects</h1>
      <h2>Will be added soon</h2>
    </div>
  );
};

export default About;
