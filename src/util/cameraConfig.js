import NAVIGATION_SECTIONS from './navigationEnums';

const CAMERA_CONFIG = {
  [NAVIGATION_SECTIONS.NAVIGATION]: {
    position: [14.01924922905226, 1.5, 8.496416641978485],
    rotation: [-0.12245000133452252, 1.3277086708838464, 0.11888422797410123],
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
