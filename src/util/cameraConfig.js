import NAVIGATION_SECTIONS from './navigationEnums';

const CAMERA_CONFIG = {
  [NAVIGATION_SECTIONS.ABOUT]: {
    position: [1.3684124378364415, 2.53, -3.7524466380375925],
    rotation: [0.016288337969524246, 0.26783291492864025, -0.00431093677006079],
  },
  [NAVIGATION_SECTIONS.SKILLS]: {
    position: [1.3684124378364415, 2.53, -3.7524466380375925],
    rotation: [0.016288337969524246, 0.26783291492864025, -0.00431093677006079],
  },
  [NAVIGATION_SECTIONS.PROJECTS]: {
    position: [1.3684124378364415, 2.53, -3.7524466380375925],
    rotation: [0.016288337969524246, 0.26783291492864025, -0.00431093677006079],
  },
  [NAVIGATION_SECTIONS.CONTACT]: {
    position: [-0.17291212323790262, 1.15, 2.1484871495685294],
    rotation: [-1.8140770756049902, 1.3392986687175865, 1.8204744808156395],
  },
  [NAVIGATION_SECTIONS.NAVIGATION]: {
    position: [14.01924922905226, 1.5, 8.496416641978485],
    rotation: [-0.12245000133452252, 1.3277086708838464, 0.11888422797410123],
  },
  [NAVIGATION_SECTIONS.EXPLORE]: {
    position: [7.523856319654146, 6.722458576436289, 7.71873158433218],
    rotation: [-0.6607506307929091, 0.6333251009685755, 0.4311660369886971],
  },
};

export const getFovBasedOnWidth = (width) => {
  if (width >= 2560) return 75;
  if (width >= 2000) return 80;
  if (width >= 1200) return 85;
  if (width >= 1000) return 90;
  if (width >= 800) return 100;
  if (width >= 750) return 105;
  if (width >= 700) return 110;
  if (width >= 650) return 115;
  if (width >= 600) return 120;
  if (width >= 550) return 120;
  if (width >= 500) return 125;
  if (width >= 450) return 130;
  if (width >= 400) return 135;
  if (width >= 300) return 140;
  if (width >= 250) return 150;
  if (width >= 200) return 155;
  return 162;
}

export default CAMERA_CONFIG;
