import * as THREE from "three";

type Coordinate = [number, number];
type Polygon = Coordinate[][];

export async function initGlobe(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>("canvas")!;
  const motionButton = root.querySelector<HTMLButtonElement>("#globe-motion")!;
  const instructions = root.querySelector<HTMLElement>("#globe-instructions")!;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    canvas.hidden = true;
    instructions.textContent = "A world of spatial possibilities";
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.z = 4.3;
  const globe = new THREE.Group();
  globe.rotation.set(0.3, -0.17, -0.13);
  scene.add(globe);
  scene.add(new THREE.AmbientLight(0xffffff, 2.0));
  const sun = new THREE.DirectionalLight(0xf5fbff, 3.0);
  sun.position.set(-3, 4, 5);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0x82b6e4, 1.5);
  fill.position.set(3, -2, -2);
  scene.add(fill);
  const surface = new THREE.MeshPhongMaterial({ color: 0x083857, shininess: 12, specular: 0x102b48 });
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), surface);
  globe.add(sphere);
  function point(lon: number, lat: number, radius = 1.008) {
    const a = THREE.MathUtils.degToRad(lon);
    const b = THREE.MathUtils.degToRad(lat);
    return new THREE.Vector3(
      radius * Math.cos(b) * Math.cos(a),
      radius * Math.sin(b),
      -radius * Math.cos(b) * Math.sin(a),
    );
  }
  const gridMaterial = new THREE.LineBasicMaterial({ color: 0x96c7de, transparent: true, opacity: 0.2 });
  for (let lat = -75; lat <= 75; lat += 15) {
    globe.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
          Array.from({ length: 181 }, (_, i) => point(i * 2 - 180, lat)),
        ),
        gridMaterial,
      ),
    );
  }
  for (let lon = -180; lon < 180; lon += 15) {
    globe.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
          Array.from({ length: 91 }, (_, i) => point(lon, i * 2 - 90)),
        ),
        gridMaterial,
      ),
    );
  }
  let disposed = false;
  let landTexture: THREE.CanvasTexture | undefined;
  try {
    const response = await fetch("/data/land.json");
    if (!response.ok) throw new Error("Globe geography unavailable");
    const land = await response.json();
    if (disposed) return;
    const textureCanvas = document.createElement("canvas");
    textureCanvas.width = 2048;
    textureCanvas.height = 1024;
    const ctx = textureCanvas.getContext("2d")!;
    ctx.fillStyle = "#002c51";
    ctx.fillRect(0, 0, 2048, 1024);
    const geometries =
      land.type === "FeatureCollection"
        ? land.features.map(
            (item: { geometry: { type: string; coordinates: Polygon[] | Polygon } }) => item.geometry,
          )
        : [land.geometry];
    const polygons: Polygon[] = geometries.flatMap(
      (geometry: { type: string; coordinates: Polygon[] | Polygon }) =>
        geometry.type === "MultiPolygon" ? geometry.coordinates : [geometry.coordinates],
    );
    ctx.fillStyle = "#5a98b7";
    ctx.strokeStyle = "#8dc6d2";
    ctx.lineWidth = 0.9;
    for (const polygon of polygons) {
      ctx.beginPath();
      for (const ring of polygon) {
        ring.forEach(([lon, lat], i) => {
          const x = ((lon + 180) / 360) * 2048;
          const y = ((90 - lat) / 180) * 1024;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
      }
      ctx.fill("evenodd");
      ctx.stroke();
    }
    // A fine sampling grid gives the land surface a geospatial data texture.
    const mask = ctx.getImageData(0, 0, 2048, 1024);
    ctx.fillStyle = "#acdce6";
    for (let y = 4; y < 1024; y += 9) {
      for (let x = 4; x < 2048; x += 9) {
        if (mask.data[(y * 2048 + x) * 4] > 70) {
          ctx.beginPath();
          ctx.arc(x, y, 1.25, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    landTexture = new THREE.CanvasTexture(textureCanvas);
    landTexture.colorSpace = THREE.SRGBColorSpace;
    landTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    surface.map = landTexture;
    surface.color.set(0xffffff);
    surface.needsUpdate = true;
  } catch {
    // The graticule globe still works offline if the optional geography is unavailable.
  }
  const origin = point(-96.88, 29.91, 1.018);
  const marker = new THREE.Mesh(
    new THREE.SphereGeometry(0.022, 16, 12),
    new THREE.MeshBasicMaterial({ color: 0x35e0e5 }),
  );
  marker.position.copy(origin);
  globe.add(marker);
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.035, 0.045, 40),
    new THREE.MeshBasicMaterial({ color: 0x36d5de, side: THREE.DoubleSide }),
  );
  ring.position.copy(origin);
  ring.lookAt(origin.clone().multiplyScalar(2));
  globe.add(ring);
  for (const [lon, lat] of [
    [-120, 46],
    [-73, 42],
    [-1, 51],
  ]) {
    const end = point(lon, lat, 1.018);
    const middle = origin.clone().add(end).normalize().multiplyScalar(1.35);
    const curve = new THREE.QuadraticBezierCurve3(origin, middle, end);
    globe.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(60)),
        new THREE.LineBasicMaterial({ color: 0x54cbdc, transparent: true, opacity: 0.8 }),
      ),
    );
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.008, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0x9becf1 }),
    );
    dot.position.copy(end);
    globe.add(dot);
  }
  const orbitalPoints = Array.from({ length: 181 }, (_, i) => {
    const a = (i / 180) * Math.PI * 2;
    return new THREE.Vector3(1.19 * Math.cos(a), 0, 1.19 * Math.sin(a));
  });
  const orbit = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(orbitalPoints),
    new THREE.LineBasicMaterial({ color: 0x58a2bf, transparent: true, opacity: 0.5 }),
  );
  orbit.rotation.set(0.35, 0, -0.28);
  scene.add(orbit);
  let frame = 0;
  let inView = true;
  let paused = reducedMotion.matches;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let lastTime = 0;
  const render = () => renderer.render(scene, camera);
  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  };
  function animate(time: number) {
    frame = 0;
    if (disposed || !inView || document.hidden || paused) return;
    if (!dragging) globe.rotation.y += Math.min((time - lastTime) / 1000, 0.05) * 0.075;
    lastTime = time;
    render();
    frame = requestAnimationFrame(animate);
  }
  function refreshMotion() {
    cancelAnimationFrame(frame);
    frame = 0;
    motionButton.textContent = paused ? "Resume rotation ↻" : "Pause rotation Ⅱ";
    motionButton.setAttribute("aria-label", paused ? "Resume globe rotation" : "Pause globe rotation");
    render();
    if (!paused && inView && !document.hidden) {
      lastTime = performance.now();
      frame = requestAnimationFrame(animate);
    }
  }
  motionButton.hidden = false;
  motionButton.addEventListener("click", () => {
    paused = !paused;
    refreshMotion();
  });
  canvas.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    globe.rotation.y += (event.clientX - lastX) * 0.006;
    globe.rotation.x = THREE.MathUtils.clamp(globe.rotation.x + (event.clientY - lastY) * 0.004, -0.8, 0.8);
    lastX = event.clientX;
    lastY = event.clientY;
    render();
  });
  const stopDrag = () => {
    dragging = false;
  };
  canvas.addEventListener("pointerup", stopDrag);
  canvas.addEventListener("pointercancel", stopDrag);
  canvas.addEventListener("lostpointercapture", stopDrag);
  canvas.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    paused = true;
    if (event.key === "ArrowLeft") globe.rotation.y -= 0.15;
    if (event.key === "ArrowRight") globe.rotation.y += 0.15;
    if (event.key === "ArrowUp") globe.rotation.x = Math.max(-0.8, globe.rotation.x - 0.1);
    if (event.key === "ArrowDown") globe.rotation.x = Math.min(0.8, globe.rotation.x + 0.1);
    refreshMotion();
  });
  const onMotionPreference = () => {
    paused = reducedMotion.matches;
    refreshMotion();
  };
  reducedMotion.addEventListener("change", onMotionPreference);
  document.addEventListener("visibilitychange", refreshMotion);
  const observer = new IntersectionObserver(
    (entries) => {
      inView = entries[0].isIntersecting;
      refreshMotion();
    },
    { threshold: 0.05 },
  );
  observer.observe(root);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    paused = true;
    cancelAnimationFrame(frame);
    root.classList.remove("globe-ready");
    canvas.hidden = true;
    motionButton.hidden = true;
    instructions.textContent = "A world of spatial possibilities";
  });
  resize();
  root.classList.add("globe-ready");
  refreshMotion();
  window.addEventListener("pagehide", (event) => {
    if (event.persisted) return;
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    resizeObserver.disconnect();
    reducedMotion.removeEventListener("change", onMotionPreference);
    document.removeEventListener("visibilitychange", refreshMotion);
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      }
    });
    landTexture?.dispose();
    renderer.dispose();
  });
}
