import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import CAMERA_CONFIG, { getFovBasedOnWidth } from './util/cameraConfig';
import NAVIGATION_SECTIONS from './util/navigationEnums';

function App() {
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
          <Experience />
      </Canvas>
    </>
  );
}

export default App;
