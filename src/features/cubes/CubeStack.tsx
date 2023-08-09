import React, { useRef, useEffect } from "react"
import * as THREE from "three"

const CubeStack: React.FC = () => {
  const scene = useRef<THREE.Scene>()
  const camera = useRef<THREE.PerspectiveCamera>()
  const renderer = useRef<THREE.WebGLRenderer>()
  const mouse = useRef<THREE.Vector2>(new THREE.Vector2())

  useEffect(() => {
    // Initialize scene
    const sceneObj = new THREE.Scene()
    scene.current = sceneObj

    // Initialize camera
    const cameraObj = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    cameraObj.position.z = 5
    camera.current = cameraObj

    // Initialize renderer
    const rendererObj = new THREE.WebGLRenderer()
    rendererObj.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(rendererObj.domElement)
    renderer.current = rendererObj

    // Create cubes
    const numRows = 8
    const numLayers = 12
    const cubeSize = 1
    const spacing = 1
    let cubeCount = 0

    for (let layer = 0; layer < numLayers; layer++) {
      for (let row = 0; row < numRows - layer; row++) {
        for (let col = 0; col < numRows - layer - row; col++) {
          const cubeGeometry = new THREE.BoxGeometry(
            cubeSize,
            cubeSize,
            cubeSize,
          )
          const cubeMaterial = new THREE.MeshBasicMaterial({
            color: "blue",
            transparent: true,
            opacity: 0.1,
          })

          const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
          cube.position.set(
            (col - (numRows - 1 - layer) / 2) * spacing,
            (row - (numRows - 1 - layer) / 2) * spacing,
            -layer * spacing,
          )

          sceneObj.add(cube)

          const orderNumber = ++cubeCount
          addOrderNumber(cube, orderNumber)
        }
      }
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    sceneObj.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1)
    sceneObj.add(directionalLight)

    // Start the animation
    const animate = () => {
      requestAnimationFrame(animate)

      rendererObj.render(sceneObj, cameraObj)
    }

    animate()

    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight

      cameraObj.aspect = newWidth / newHeight
      cameraObj.updateProjectionMatrix()

      rendererObj.setSize(newWidth, newHeight)
    }

    window.addEventListener("resize", handleResize)

    // Mouse move event listener
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    let isDragging = false
    const animateCameraRotation = () => {
      requestAnimationFrame(animateCameraRotation)
      const targetRotationY = (mouse.current.x - 0.5) * Math.PI * 2 * 0.5 // Adjust the rotation factor here
      cameraObj.rotation.y += (targetRotationY - cameraObj.rotation.y) * 0.05
      cameraObj.position.z +=
        (mouse.current.y * 5 - cameraObj.position.z) * 0.05
      rendererObj.render(sceneObj, cameraObj)
      if (isDragging) {
        const targetRotationY = (mouse.current.x - 0.5) * Math.PI * 2 * 0.5
        cameraObj.rotation.y += (targetRotationY - cameraObj.rotation.y) * 0.05
      }
      cameraObj.position.z +=
        (mouse.current.y * 5 - cameraObj.position.z) * 0.05
      rendererObj.render(sceneObj, cameraObj)
    }

    animateCameraRotation()

    const handleMouseDown = () => {
        isDragging = true;
      };
      
      const handleMouseUp = () => {
        isDragging = false;
      };
      
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      
      return () => {
        // Clean up event listeners
        // window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
      };
  }, [])

  const addOrderNumber = (cube: THREE.Mesh, orderNumber: number) => {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")

    if (!context) {
      console.error("2D context is not supported")
      return
    }

    const fontSize = 40
    const text = orderNumber.toString()

    context.font = `${fontSize}px Arial`
    const textWidth = context.measureText(text).width
    canvas.width = textWidth
    canvas.height = fontSize

    context.font = `${fontSize}px Arial`
    context.fillStyle = "white"
    context.fillText(text, 0, fontSize)

    const texture = new THREE.Texture(canvas)
    texture.needsUpdate = true

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    })

    const textMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)
    textMesh.scale.set(0.2, 0.2, 1)
    textMesh.position.z = 0.5 // Position on the outward-facing side of the cube

    cube.add(textMesh)
  }

  return <div style={{ width: "100%", height: "100vh" }}></div>
}

export default CubeStack
