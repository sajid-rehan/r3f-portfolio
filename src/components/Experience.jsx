import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useNavigation } from './../contexts/NavigationContext';
import { useOrbitControls } from './../contexts/OrbitControlsContext';
import DATA from './../data/data';
import CameraAnimator from './../util/CameraAnimator';
import { getCameraFit, poseFor } from './../util/responsiveCamera';
import NAVIGATION_SECTIONS from './../util/navigationEnums';
import { notifyInfo } from './../util/notify';
import { Avatar } from './Avatar';
import { LaptopScreen } from './LaptopScreen';
import { MonitorScreen } from './MonitorScreen';
import { Scene } from './Scene';
import { TvScreen } from './TvScreen';

/**
 * @param {Object} props
 * @param {boolean} [props.fromLaptop] The camera starts at the laptop (coming
 * back from the desktop) and zooms out to the explore view.
 */
export const Experience = ({ fromLaptop = false }) => {
  const orbitRef = useRef();
  const { camera, size } = useThree();
  const { controlsEnabled, setControlsEnabled } = useOrbitControls();
  const { activeSection } = useNavigation();
  const [isExploreNotificationShown, setIsExploreNotificationShown] =
    useState(false);

  const isExploreMode =
    activeSection === NAVIGATION_SECTIONS.EXPLORE &&
    !isExploreNotificationShown;

  useEffect(() => {
    if (isExploreMode) {
      notifyInfo(DATA.notifications.exploreModeActivated, 10000);
      setIsExploreNotificationShown(true);
    }
  }, [activeSection, setControlsEnabled]);

  useEffect(() => {
    CameraAnimator.init(camera, 0.05);
    if (fromLaptop) {
      const { position, rotation } = poseFor(NAVIGATION_SECTIONS.EXPLORE);
      CameraAnimator.animateTo(position, rotation);
    }
  }, [camera]);

  useFrame(() => {
    CameraAnimator.update();
  });

  return (
    <>
      {controlsEnabled && (
        <OrbitControls
          ref={orbitRef}
          minDistance={1.5}
          maxDistance={
            12.69383200755635 * getCameraFit(size.width / size.height).dolly
          }
          enableDamping={true}
          dampingFactor={0.05}
          minAzimuthAngle={THREE.MathUtils.degToRad(-20)}
          maxAzimuthAngle={THREE.MathUtils.degToRad(90)}
          minPolarAngle={THREE.MathUtils.degToRad(30)}
          maxPolarAngle={THREE.MathUtils.degToRad(85)}
          enablePan={false}
        />
      )}
      <ambientLight intensity={1.5} />
      <Scene />
      <TvScreen />
      <MonitorScreen />
      <LaptopScreen />
      <group
        name='Avatar'
        position={[2.692, 2.496, -2.075]}
        rotation={[0.024, 0, 0]}
        scale={1.042}
      >
        <Avatar />
      </group>
    </>
  );
};
