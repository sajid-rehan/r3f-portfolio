import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { useNavigation } from './../contexts/NavigationContext';
import CameraAnimator from './../util/CameraAnimator';
import NAVIGATION_SECTIONS from './../util/navigationEnums';
import { getCameraFit, poseFor } from './../util/responsiveCamera';

/**
 * Keeps the camera FOV and room framing in sync with the canvas size (window
 * resize, device rotation). Renders nothing.
 */
export const ResponsiveCamera = () => {
  const { camera, size } = useThree();
  const { activeSection } = useNavigation();
  const first = useRef(true);

  useEffect(() => {
    const { fov } = getCameraFit(size.width / size.height);
    camera.fov = fov;
    camera.updateProjectionMatrix();

    // The initial pose is already fitted (see App.jsx); only re-fit later.
    if (first.current) {
      first.current = false;
      return;
    }
    // While the visitor looks around freely (explore) OrbitControls owns the
    // camera; every other room view is re-fitted to the new size.
    const section = activeSection || NAVIGATION_SECTIONS.NAVIGATION;
    if (section !== NAVIGATION_SECTIONS.EXPLORE) {
      const { position, rotation } = poseFor(section);
      CameraAnimator.animateTo(position, rotation);
    }
  }, [camera, size.width, size.height]);

  return null;
};
