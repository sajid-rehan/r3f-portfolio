/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 public/models/scene.glb 
*/

import { useAnimations, useGLTF, useTexture } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Scene(props) {
  const groupRef = useRef();
  const { nodes, animations } = useGLTF('models/scene.glb');

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group name='Scene'>
        <mesh
          name='scene'
          geometry={nodes.scene.geometry}
          material={textureMaterial}
        />
        <mesh
          name='visitcard'
          geometry={nodes.visitcard.geometry}
          material={textureMaterial}
        />
        <mesh
          name='about'
          geometry={nodes.about.geometry}
          material={textureMaterial}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'default')}
        />
        <mesh
          name='skills'
          geometry={nodes.skills.geometry}
          material={textureMaterial}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'default')}
        />
        <mesh
          name='projects'
          geometry={nodes.projects.geometry}
          material={textureMaterial}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'default')}
        />
        <mesh
          name='contact'
          geometry={nodes.contact.geometry}
          material={textureMaterial}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'default')}
        />
      </group>
    </group>
  );
}

useGLTF.preload('models/scene.glb');
