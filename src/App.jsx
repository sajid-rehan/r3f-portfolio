import { Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Suspense, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import CloseButton from './components/CloseButton';
import Desktop from './desktop/Desktop';
import { Experience } from './components/Experience';
import { ResponsiveCamera } from './components/ResponsiveCamera';
import NavigationButton from './components/NavigationButton';
import { useNavigation } from './contexts/NavigationContext';
import { useOrbitControls } from './contexts/OrbitControlsContext';
import CameraAnimator from './util/CameraAnimator';
import { getCameraFit, poseFor } from './util/responsiveCamera';
import NAVIGATION_SECTIONS from './util/navigationEnums';

function App() {
  const { setControlsEnabled } = useOrbitControls();
  const {
    activeSection,
    setActiveSection,
    viewMode,
    setViewMode,
    desktopApp,
    openDesktop,
    pendingDesktop,
    setPendingDesktop,
  } = useNavigation();
  const cameFromDesktop = useRef(false);

  const navbarSections = [
    NAVIGATION_SECTIONS.ABOUT,
    NAVIGATION_SECTIONS.SKILLS,
    NAVIGATION_SECTIONS.PROJECTS,
    NAVIGATION_SECTIONS.CONTACT,
  ];

  const isNavbarClicked = navbarSections.includes(activeSection);
  const isExploreMode = activeSection === NAVIGATION_SECTIONS.EXPLORE;
  // Poses and FOV are fitted to the viewport (util/responsiveCamera.js).
  const initialPosition = poseFor(NAVIGATION_SECTIONS.NAVIGATION).position;
  const initialRotation = poseFor(NAVIGATION_SECTIONS.NAVIGATION).rotation;
  // Coming back from the desktop the camera starts at the laptop.
  const startPose = cameFromDesktop.current
    ? poseFor(NAVIGATION_SECTIONS.ABOUT)
    : poseFor(NAVIGATION_SECTIONS.NAVIGATION);
  const fov = getCameraFit().fov;
  // const FOV = 2 * Math.atan(window.innerHeight/(2*200)) * (180 / Math.PI);
  // Returning to the room (Room icon or browser back).
  useEffect(() => {
    if (viewMode === 'desktop') {
      cameFromDesktop.current = true;
    } else if (cameFromDesktop.current) {
      // Back in the room: free-look (explore) mode, zooming out of the laptop.
      setActiveSection(NAVIGATION_SECTIONS.EXPLORE);
      setControlsEnabled(true);
    }
  }, [viewMode]);

  if (viewMode === 'desktop') {
    return (
      <motion.div
        className='desktop-screen'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Desktop
          initialApps={[desktopApp]}
          onExit={() => setViewMode('room')}
        />
      </motion.div>
    );
  }

  return (
    <>
      <Canvas
        shadows
        camera={{
          position: startPose.position,
          rotation: startPose.rotation,
          fov: fov,
        }}
      >
        <color attach='background' args={['#141617']} />
        <Suspense fallback={null}>
          <ResponsiveCamera />
          <Experience fromLaptop={cameFromDesktop.current} />
        </Suspense>
      </Canvas>
      <Loader />
      <ToastContainer />

      {cameFromDesktop.current && (
        <motion.div
          className='veil'
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
      {pendingDesktop && (
        <motion.div
          className='veil'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          onAnimationComplete={() => {
            openDesktop(pendingDesktop);
            setPendingDesktop(null);
          }}
        />
      )}

      {!isNavbarClicked && (
        <button className='skip-link' onClick={() => openDesktop('about')}>
          Skip to desktop view
        </button>
      )}

      {isNavbarClicked && (
        <CloseButton
          onClose={async () => {
            setActiveSection(NAVIGATION_SECTIONS.EXPLORE);
            setControlsEnabled(true);
            const explorePosition = poseFor(
              NAVIGATION_SECTIONS.EXPLORE,
            ).position;
            const exploreRotation = poseFor(
              NAVIGATION_SECTIONS.EXPLORE,
            ).rotation;
            await CameraAnimator.animateTo(explorePosition, exploreRotation);
          }}
        />
      )}

      {isExploreMode && (
        <NavigationButton
          onClick={async () => {
            setActiveSection(NAVIGATION_SECTIONS.NAVIGATION);
            setControlsEnabled(false);
            await CameraAnimator.animateTo(initialPosition, initialRotation);
          }}
        />
      )}
    </>
  );
}

export default App;
