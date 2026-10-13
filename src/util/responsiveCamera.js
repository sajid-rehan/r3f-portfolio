import * as THREE from 'three';
import CAMERA_CONFIG from './cameraConfig';
import NAVIGATION_SECTIONS from './navigationEnums';

/**
 * Dynamic camera fit.
 *
 * Keeps the same horizontal slice of the room in view on any screen, from the
 * live aspect ratio (it replaces the previous hand-made table of width breakpoints):
 *
 *  - the horizontal FOV is constant (taken from the tuned desktop view),
 *  - the vertical FOV follows from the aspect ratio, clamped to
 *    [FOV_MIN, FOV_MAX],
 *  - what the clamp takes away is made up by moving the camera back along its
 *    view direction ("dolly"), so the room still fits.
 */

// Tuned reference: 85 degrees vertical on a 16:10 desktop window.
const REF_FOV_Y = THREE.MathUtils.degToRad(85);
const REF_ASPECT = 1.6;
const REF_TAN_H = Math.tan(REF_FOV_Y / 2) * REF_ASPECT;

// Below this the room drifts off-centre: the poses aim slightly past the middle
// of the scene, and a narrow lens magnifies that offset.
const FOV_MIN = 75;
// The scene is designed for a wide lens: the signpost sits only a few units from
// the camera, so pulling the camera back (or flattening the lens) shrinks it far
// more than the room and makes it unreadable. Phones in portrait need ~145
// degrees; the dolly only kicks in beyond the cap.
const FOV_MAX = 160;

// Portrait screens are narrower than the scene is wide, so it would float in a
// lot of empty space. Zoom in a little (up to this factor) as the aspect ratio
// drops from 1 to PORTRAIT_FULL_AT.
const PORTRAIT_ZOOM = 1.35;
const PORTRAIT_FULL_AT = 0.6;

// Poses whose subject is the whole room; only these are pulled back.
const DOLLY_SECTIONS = [
  NAVIGATION_SECTIONS.NAVIGATION,
  NAVIGATION_SECTIONS.EXPLORE,
];

const currentAspect = () => window.innerWidth / window.innerHeight;

/**
 * @param {number} aspect Viewport width / height.
 * @returns {{fov: number, dolly: number}} Vertical FOV in degrees and the
 * factor by which the room poses are pulled back (1 = not at all).
 */
export const getCameraFit = (aspect = currentAspect()) => {
  const portrait = THREE.MathUtils.clamp(
    (1 - aspect) / (1 - PORTRAIT_FULL_AT),
    0,
    1,
  );
  const zoom = 1 + (PORTRAIT_ZOOM - 1) * portrait;
  const wantedTan = REF_TAN_H / (aspect * zoom);
  const wantedFov = THREE.MathUtils.radToDeg(2 * Math.atan(wantedTan));
  const fov = THREE.MathUtils.clamp(wantedFov, FOV_MIN, FOV_MAX);
  const dolly = Math.max(
    1,
    wantedTan / Math.tan(THREE.MathUtils.degToRad(fov) / 2),
  );
  return { fov, dolly };
};

/**
 * Camera pose for a section, pulled back to fit the current viewport. Poses
 * that are not room-wide (laptop, contact) are returned unchanged.
 *
 * @param {string} section A NAVIGATION_SECTIONS value.
 * @returns {{position: number[], rotation: number[]}}
 */
export const poseFor = (section) => {
  const pose = CAMERA_CONFIG[section];
  if (!DOLLY_SECTIONS.includes(section)) return pose;

  const { dolly } = getCameraFit();
  if (dolly <= 1) return pose;

  const position = new THREE.Vector3(...pose.position);
  const forward = new THREE.Vector3(0, 0, -1).applyEuler(
    new THREE.Euler(...pose.rotation),
  );
  // Distance along the view direction to the point nearest the room centre.
  const distance = Math.max(0.1, -position.dot(forward));
  position.addScaledVector(forward, -distance * (dolly - 1));
  return { position: position.toArray(), rotation: pose.rotation };
};
