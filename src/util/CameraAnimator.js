import * as THREE from 'three';

/**
 * CameraAnimator is a utility class for animating the camera to a target
 * position and rotation.
 */
class CameraAnimator {
  /**
   * The camera to animate
   * @type {THREE.Camera}
   */
  static camera = null;

  /**
   * The target position to animate towards
   * @type {THREE.Vector3}
   */
  static targetPosition = new THREE.Vector3();

  /**
   * The target rotation to animate towards
   * @type {THREE.Euler}
   */
  static targetRotation = new THREE.Euler();

  /**
   * The smoothness of the animation. A higher value will result in a faster
   * animation.
   * @type {Number}
   */
  static smoothness = 0.05;

  /**
   * Whether or not the camera is currently animating.
   * @type {Boolean}
   */
  static isAnimating = false;

  /**
   * A callback that will be called when the camera has finished animating.
   * @type {Function}
   */
  static onComplete = null;

  /**
   * Initialize the CameraAnimator.
   * @param {THREE.Camera} camera The camera to animate
   * @param {Number} [smoothness=0.05] The smoothness of the animation
   */
  static init(camera, smoothness = 0.05) {
    CameraAnimator.camera = camera;
    CameraAnimator.smoothness = smoothness;
  }

  /**
   * Animate the camera towards the target position and rotation.
   *
   * @param {Array<Number>} position The position to animate towards
   * @param {Array<Number>} rotation The rotation to animate towards
   * @returns {Promise} A promise that is resolved when the animation is
   * complete
   */
  static animateTo(position, rotation) {
    CameraAnimator.targetPosition.set(...position);
    CameraAnimator.targetRotation.set(...rotation);
    CameraAnimator.isAnimating = true;

    return new Promise((resolve) => {
      CameraAnimator.onComplete = () => {
        CameraAnimator.isAnimating = false;
        resolve();
      };
    });
  }

  /**
   * Update the camera's position and rotation towards the targetPosition and
   * targetRotation, using the smoothness value to control the speed of the
   * animation.
   *
   * If the camera is close enough to the targetPosition
   * (within a distance of 0.01), the onComplete callback will be called.
   */
  static update() {
    if (!CameraAnimator.isAnimating || !CameraAnimator.camera) {
      return;
    }

    const { position, rotation } = CameraAnimator.camera;

    position.lerp(CameraAnimator.targetPosition, CameraAnimator.smoothness);
    rotation.set(
      THREE.MathUtils.lerp(
        rotation.x, CameraAnimator.targetRotation.x, CameraAnimator.smoothness,
      ),
      THREE.MathUtils.lerp(
        rotation.y, CameraAnimator.targetRotation.y, CameraAnimator.smoothness,
      ),
      THREE.MathUtils.lerp(
        rotation.z, CameraAnimator.targetRotation.z, CameraAnimator.smoothness,
      ),
    );

    if (position.distanceTo(CameraAnimator.targetPosition) < 0.01) {
      CameraAnimator.onComplete?.();
    }
  }
}

export default CameraAnimator;
