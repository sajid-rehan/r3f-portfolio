import AboutApp from './apps/AboutApp';
import ContactApp from './apps/ContactApp';
import ExperienceApp from './apps/ExperienceApp';
import ProjectsApp from './apps/ProjectsApp';
import SkillsApp from './apps/SkillsApp';

// Registry of desktop apps. `size` is [width, height] as a fraction of the
// desktop area, so windows scale with their host.
// `id` matches NAVIGATION_SECTIONS values so the 3D
// scene can later open an app by section name.
const APPS = [
  {
    id: 'about',
    title: 'About',
    color: ['#5ac8fa', '#0a84ff'],
    icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5Z',
    size: [0.6, 0.64],
    Component: AboutApp,
  },
  {
    id: 'experience',
    title: 'Experience',
    color: ['#ff9f0a', '#ff453a'],
    icon: 'M9 4a2 2 0 0 0-2 2v1H4a1 1 0 0 0-1 1v4h18V8a1 1 0 0 0-1-1h-3V6a2 2 0 0 0-2-2H9Zm0 2h6v1H9V6ZM3 14v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-5h-8v1.500h-2V14H3Z',
    size: [0.56, 0.68],
    Component: ExperienceApp,
  },
  {
    id: 'skills',
    title: 'Skills',
    color: ['#ffd60a', '#ff9f0a'],
    icon: 'M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4Zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4Z',
    size: [0.52, 0.56],
    Component: SkillsApp,
  },
  {
    id: 'projects',
    title: 'Projects',
    color: ['#64d2ff', '#30a2e8'],
    icon: 'M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z',
    size: [0.76, 0.72],
    Component: ProjectsApp,
  },
  {
    id: 'contact',
    title: 'Contact',
    color: ['#30d158', '#248a3d'],
    icon: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 7L5 7.5V9l7 4.5L19 9V7.5L12 12Z',
    size: [0.42, 0.5],
    Component: ContactApp,
  },
];

export default APPS;
