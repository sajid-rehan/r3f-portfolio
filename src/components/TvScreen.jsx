/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 public/models/tvScreen.glb 
*/

import { useGLTF, useVideoTexture } from '@react-three/drei';
import React from 'react';

export function TvScreen(props) {
  const { nodes } = useGLTF('./models/tvScreen.glb');
  const textureTv = useVideoTexture('./textures/screensaver.mp4');

  return (
    <group {...props} dispose={null}>
      <group name='Scene'>
        <mesh
          geometry={nodes.tv_screen.geometry}
          material={nodes.tv_screen.material}
        >
          <meshBasicMaterial map={textureTv} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload('./models/tvScreen.glb');
