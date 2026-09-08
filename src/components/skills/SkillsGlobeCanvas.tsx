import { useMemo, useRef, useState, useCallback, useEffect, type ComponentRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Billboard, Html, Line, OrbitControls } from '@react-three/drei';
import type { Group } from 'three';
import * as THREE from 'three';
import { fibonacciSphere, globeSkills, type GlobeSkill } from '../../data/globeSkills';
import { useIsMobile, usePrefersReducedMotion } from '../../hooks/useMedia';
import { SkillBrandIcon, skillBrandIcons } from './SkillBrandIcon';

const RADIUS = 2.55;

function WireGlobe({ sparse }: { sparse: boolean }) {
  const geo = useMemo(
    () => new THREE.IcosahedronGeometry(RADIUS, sparse ? 0 : 1),
    [sparse],
  );

  return (
    <group>
      <mesh geometry={geo}>
        <meshBasicMaterial
          color="#8a3d22"
          transparent
          opacity={0.03}
          depthWrite={false}
        />
      </mesh>
      <mesh geometry={geo}>
        <meshBasicMaterial color="#8a3d22" wireframe transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function NetworkLines({
  points,
  sparse,
}: {
  points: [number, number, number][];
  sparse: boolean;
}) {
  const segments = useMemo(() => {
    const links: [number, number][] = [];
    const count = sparse ? 3 : 7;
    for (let i = 0; i < count; i += 1) {
      const a = (i * 3) % points.length;
      const b = (a + 4) % points.length;
      if (a !== b) links.push([a, b]);
    }
    return links;
  }, [points.length, sparse]);

  return (
    <group>
      {segments.map(([a, b], index) => (
        <Line
          key={`net-${index}`}
          points={[points[a], points[b]]}
          color="#8a4a28"
          lineWidth={1}
          transparent
          opacity={0.14}
        />
      ))}
    </group>
  );
}

function SkillNode({
  skill,
  position,
  onHover,
}: {
  skill: GlobeSkill;
  position: [number, number, number];
  onHover: (skill: GlobeSkill | null) => void;
}) {
  const { camera } = useThree();
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<Group>(null);
  const world = useMemo(() => new THREE.Vector3(), []);
  const wide = Boolean(skillBrandIcons[skill.name]?.wide);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.getWorldPosition(world);
    const fromCenter = world.clone().normalize();
    const toCamera = camera.position.clone().normalize();
    const facing = fromCenter.dot(toCamera);
    const normalizedDepth = (facing + 1) / 2;
    const scale = Math.min(1, 0.72 + normalizedDepth * 0.28);
    let opacity = 0.3 + normalizedDepth * 0.7;
    if (facing < -0.42) opacity = 0;
    else if (facing < -0.15) opacity *= 0.32;

    groupRef.current.scale.setScalar(hovered ? Math.min(scale * 1.05, 1) : scale);
    const el = groupRef.current.userData.html as HTMLElement | undefined;
    if (el) {
      el.style.opacity = String(opacity);
      el.style.pointerEvents = opacity < 0.08 ? 'none' : 'auto';
      el.style.visibility = opacity < 0.05 ? 'hidden' : 'visible';
      el.style.filter =
        facing > 0.15 ? 'brightness(1.08)' : facing < -0.1 ? 'brightness(0.72)' : 'none';
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Billboard follow lockZ>
        <Html
          center
          distanceFactor={12}
          style={{ pointerEvents: 'auto', transform: 'scale(1)' }}
          zIndexRange={[40, 0]}
        >
          <button
            type="button"
            className="skill-node touch-compact"
            ref={(node) => {
              if (groupRef.current) groupRef.current.userData.html = node;
            }}
            onPointerEnter={() => {
              setHovered(true);
              onHover(skill);
            }}
            onPointerLeave={() => {
              setHovered(false);
              onHover(null);
            }}
            onFocus={() => {
              setHovered(true);
              onHover(skill);
            }}
            onBlur={() => {
              setHovered(false);
              onHover(null);
            }}
            aria-label={`${skill.name}, ${skill.category}`}
          >
            <SkillBrandIcon
              name={skill.name}
              className={`skill-logo${wide ? ' skill-logo--wide' : ''}`}
            />
            <span className="skill-label">{skill.name}</span>
          </button>
        </Html>
      </Billboard>
    </group>
  );
}

function SkillsUniverse({
  reduced,
  dragging,
  setDragging,
  sparse,
}: {
  reduced: boolean;
  dragging: boolean;
  setDragging: (v: boolean) => void;
  sparse: boolean;
}) {
  const points = useMemo(() => fibonacciSphere(globeSkills.length, RADIUS), []);
  const [hovered, setHovered] = useState<GlobeSkill | null>(null);
  const controlsRef = useRef<ComponentRef<typeof OrbitControls>>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setAutoRotate = useCallback(
    (on: boolean) => {
      if (controlsRef.current) {
        controlsRef.current.autoRotate = on && !reduced;
      }
    },
    [reduced],
  );

  const scheduleResume = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      if (!hovered && !dragging && !reduced) setAutoRotate(true);
    }, 900);
  }, [hovered, dragging, reduced, setAutoRotate]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  const onHover = useCallback(
    (skill: GlobeSkill | null) => {
      setHovered(skill);
      if (skill) {
        setAutoRotate(false);
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
      } else {
        scheduleResume();
      }
    },
    [setAutoRotate, scheduleResume],
  );

  return (
    <>
      <ambientLight intensity={0.6} />
      <group>
        <WireGlobe sparse={sparse} />
        <NetworkLines points={points} sparse={sparse} />
        {globeSkills.map((skill, index) => (
          <SkillNode
            key={skill.name}
            skill={skill}
            position={points[index]}
            onHover={onHover}
          />
        ))}
      </group>

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.12}
        autoRotate={!reduced && !dragging && !hovered}
        autoRotateSpeed={0.95}
        rotateSpeed={0.75}
        minPolarAngle={0.25}
        maxPolarAngle={Math.PI - 0.25}
        onStart={() => {
          setDragging(true);
          setAutoRotate(false);
          if (resumeTimer.current) clearTimeout(resumeTimer.current);
        }}
        onEnd={() => {
          setDragging(false);
          scheduleResume();
        }}
      />
    </>
  );
}

export function SkillsGlobeCanvas() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [dragging, setDragging] = useState(false);

  return (
    <div className="skills-globe">
      <div
        className={`skills-globe-canvas ${dragging ? 'is-dragging' : ''}`}
        style={{ touchAction: 'none' }}
      >
        <Canvas
          dpr={isMobile ? [1, 1.25] : [1, 1.6]}
          camera={{ position: [0, 0.1, 7.4], fov: 40 }}
          style={{ width: '100%', height: '100%' }}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
          aria-label="Interactive 3D skills globe"
        >
          <SkillsUniverse
            reduced={reduced}
            dragging={dragging}
            setDragging={setDragging}
            sparse={isMobile || reduced}
          />
        </Canvas>
      </div>
    </div>
  );
}
