import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Avatar } from './Avatar';
import { LaptopScreen } from './LaptopScreen';
import { MonitorScreen } from './MonitorScreen';
import { Scene } from './Scene';
import { TvScreen } from './TvScreen';

export const Experience = () => {
  const orbitRef = useRef();

  return (
    <>
        <OrbitControls
          ref={orbitRef}
          minDistance={1.5}
          maxDistance={12.69383200755635}
          enableDamping={true}
          dampingFactor={0.05}
          minAzimuthAngle={THREE.MathUtils.degToRad(-20)}
          maxAzimuthAngle={THREE.MathUtils.degToRad(90)}
          minPolarAngle={THREE.MathUtils.degToRad(30)}
          maxPolarAngle={THREE.MathUtils.degToRad(85)}
          enablePan={false}
        />
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
