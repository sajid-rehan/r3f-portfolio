// Host width (px) below which the desktop uses its compact (phone) layout and
// the 3D scene hands over to the full-screen desktop instead of the laptop.
export const COMPACT_BELOW = 900;

export const isCompactViewport = () => window.innerWidth < COMPACT_BELOW;
