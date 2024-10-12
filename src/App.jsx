import { Loader } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import CloseButton from './components/CloseButton';
import { Experience } from './components/Experience';
import NavigationButton from './components/NavigationButton';
import { useNavigation } from './contexts/NavigationContext';
import { useOrbitControls } from './contexts/OrbitControlsContext';
import CameraAnimator from './util/CameraAnimator';
import CAMERA_CONFIG, { getFovBasedOnWidth } from './util/cameraConfig';
import NAVIGATION_SECTIONS from './util/navigationEnums';

function App() {
  const { setControlsEnabled } = useOrbitControls();
  const { activeSection, setActiveSection } = useNavigation();

  const navbarSections = [
    NAVIGATION_SECTIONS.ABOUT,
    NAVIGATION_SECTIONS.SKILLS,
    NAVIGATION_SECTIONS.PROJECTS,
    NAVIGATION_SECTIONS.CONTACT,
  ];

  const isNavbarClicked = navbarSections.includes(activeSection);
  const isExploreMode = activeSection === NAVIGATION_SECTIONS.EXPLORE;
  const initialPosition =
    CAMERA_CONFIG[NAVIGATION_SECTIONS.NAVIGATION].position;
  const initialRotation =
    CAMERA_CONFIG[NAVIGATION_SECTIONS.NAVIGATION].rotation;
  const fov = getFovBasedOnWidth(window.innerWidth);

  return (
    <>
      <Canvas
        shadows
        camera={{
          position: initialPosition,
          rotation: initialRotation,
          fov: fov,
        }}
      >
        <color attach='background' args={['#141617']} />
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <Loader />
      <ToastContainer />

      {isNavbarClicked && (
        <CloseButton
          onClose={async () => {
            setActiveSection(NAVIGATION_SECTIONS.EXPLORE);
            setControlsEnabled(true);
            const explorePosition =
              CAMERA_CONFIG[NAVIGATION_SECTIONS.EXPLORE].position;
            const exploreRotation =
              CAMERA_CONFIG[NAVIGATION_SECTIONS.EXPLORE].rotation;
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
