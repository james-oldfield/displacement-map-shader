global.THREE = require('THREE');
const createOrbitViewer = require('THREE-orbit-viewer')(global.THREE);
const createBackground = require('THREE-vignette-background');
const glslify = require('glslify');

const app = createOrbitViewer({
  clearColor: 0x000000,
  clearAlpha: 1.0,
  fov: 45,
  position: new global.THREE.Vector3(3, 2, -3),
});

const bg = createBackground();
app.scene.add(bg);

const sphereGeo = new global.THREE.SphereGeometry(1, 64, 64);
const mat = new global.THREE.ShaderMaterial({
  vertexShader: glslify('./materials/shaders/noise.vert'),
  fragmentShader: glslify('./materials/shaders/noise.frag'),
  uniforms: {
    txt: {
      type: 't',
      value: global.THREE.ImageUtils.loadTexture('images/rubber.jpg'),
    },
    time: {
      type: 'f',
      value: 0.0,
    },
    scale: {
      type: 'f',
      value: 0.75,
    },
  },
});
const sphere = new global.THREE.Mesh(sphereGeo, mat);
app.scene.add(sphere);

app.on('tick', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  mat.uniforms.time.value += 0.05;

  bg.style({
    aspect: width / height,
    aspectCorrection: true,
    scale: 2.5,
    grainScale: 0,
  });
});
