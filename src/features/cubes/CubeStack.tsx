import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const CubeStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scene = useRef<THREE.Scene>();
  const camera = useRef<THREE.PerspectiveCamera>();
  const renderer = useRef<THREE.WebGLRenderer>();
  const cubes = useRef<THREE.Mesh[]>([]);
  const mouse = useRef<THREE.Vector2>(new THREE.Vector2());
  const prevMousePos = useRef<THREE.Vector2>(new THREE.Vector2());
  const dragging = useRef(false);
  const zooming = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const sceneObj = new THREE.Scene();
    scene.current = sceneObj;

    // Initialize camera
    const cameraObj = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    cameraObj.position.z = 10;
    camera.current = cameraObj;

    // Initialize renderer
    const rendererObj = new THREE.WebGLRenderer();
    rendererObj.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(rendererObj.domElement);
    renderer.current = rendererObj;

    // Create cubes
    const numRows = 8;
    const numLayers = 12;
    const cubeSize = 1;
    const spacing = 1;

    for (let layer = 0; layer < numLayers; layer++) {
      for (let row = 0; row < numRows - layer; row++) {
        for (let col = 0; col < numRows - layer - row; col++) {
          const cubeGeometry = new THREE.BoxGeometry(
            cubeSize,
            cubeSize,
            cubeSize
          );
          const cubeMaterial = new THREE.MeshBasicMaterial({
            color: "blue",
            transparent: true,
            opacity: 0.1
          });

          const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
          cube.position.set(
            (col - (numRows - 1 - layer) / 2) * spacing,
            (row - (numRows - 1 - layer) / 2) * spacing,
            -layer * spacing
          );

          sceneObj.add(cube);
          cubes.current.push(cube);

          const orderNumber = row * (numRows - layer) + col + 1;
          addOrderNumber(cube, orderNumber);
        }
      }
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneObj.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    sceneObj.add(directionalLight);

    // Start the animation
    const animate = () => {
      requestAnimationFrame(animate);

      if (dragging.current) {
        const deltaX = mouse.current.x - prevMousePos.current.x;
        const rotationSpeed = (Math.PI / 2) * 0.005;
        cameraObj.rotation.y -= deltaX * rotationSpeed;
      }

      if (zooming.current) {
        const zoomSpeed = 0.1;
        cameraObj.position.z -= mouse.current.y * zoomSpeed;
        cameraObj.position.z = Math.max(2, Math.min(15, cameraObj.position.z));
      }

      prevMousePos.current.set(mouse.current.x, mouse.current.y);

      rendererObj.render(sceneObj, cameraObj);
    };

    animate();

    // Resize event listener
    const handleResize = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;

        cameraObj.aspect = newWidth / newHeight;
        cameraObj.updateProjectionMatrix();

        rendererObj.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    // Mouse move event listener
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        mouse.current.x =
          (event.clientX / containerRef.current.clientWidth) * 2 - 1;
        mouse.current.y =
          -(event.clientY / containerRef.current.clientHeight) * 2 + 1;
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 0) {
        dragging.current = true;
      }
    };

    const handleMouseUp = () => {
      dragging.current = false;
    };

    const handleMouseWheel = (event: WheelEvent) => {
      zooming.current = true;
      setTimeout(() => {
        zooming.current = false;
      }, 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("wheel", handleMouseWheel);

    return () => {
      // Clean up event listeners
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("wheel", handleMouseWheel);
    };
  }, []);

  const addOrderNumber = (cube: THREE.Mesh, orderNumber: number) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      console.error("2D context is not supported");
      return;
    }

    const fontSize = 40;
    const text = orderNumber.toString();

    context.font = `${fontSize}px Arial`;
    const textWidth = context.measureText(text).width;
    canvas.width = textWidth;
    canvas.height = fontSize;

    context.font = `${fontSize}px Arial`;
    context.fillStyle = "white";
    context.fillText(text, 0, fontSize);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true
    });

    const textMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    textMesh.scale.set(0.2, 0.2, 1);
    textMesh.position.z = 0.5; // Position on the outward-facing side of the cube

    cube.add(textMesh);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "fixed"
      }}
    ></div>
  );
};

export default CubeStack;
