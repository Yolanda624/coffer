import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { GUI } from 'three/examples/jsm/libs/'
// webGL对象配置
export const webglOBJ = {
  renderDom: null,
  Scene: null, // 场景
  camera: null, // 摄像头
  renderer: null, // 渲染器
  senceAdd (objList = []) {
    objList.forEach(v => {
      webglOBJ.Scene.add(v);
    });
  },
  // 创建场景
  createSence (renderDom) {
    this.renderDom = renderDom;
    webglOBJ.Scene = new THREE.Scene();
    return webglOBJ.Scene;
  },
  // 创建摄像机
  createCamera ({innerWidth, innerHeight, position} = {}) {
    const { width, height } = this.renderDom.getBoundingClientRect();
    let camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.x = -50;
    camera.position.y = 30;
    camera.position.z = 50;
    camera.lookAt(webglOBJ.Scene.position); // 视角
    webglOBJ.camera = camera; // 视角
    return webglOBJ.camera;
  },
  createRenderer () {
    let renderer = new THREE.WebGLRenderer();
    const {width, height} = this.renderDom.getBoundingClientRect();
    renderer.setSize(width, height);
    renderer.setClearColor(new THREE.Color(0xcccccc));
    renderer.shadowMap.enabled = true;
    this.renderDom.appendChild(renderer.domElement);
    webglOBJ.renderer = renderer;
    return webglOBJ.renderer;
  },
  createPlane (textureLoaderUrl, textureNormalUrl) {
    let planeGeometry = new THREE.PlaneGeometry(60, 60, 1, 1); // 平面网格
    let textureLoader = new THREE.TextureLoader();
    let texture = textureLoader.load(textureLoaderUrl);
    let textureNormal = textureLoader.load(textureNormalUrl);
    // 加载高光贴图
    let planeMaterial = new THREE.MeshPhongMaterial({
      // specular: 0xff0000,//高光部分的颜色
      shininess: 30, //高光部分的亮度，默认30
      map: texture, // 普通纹理贴图
      roughness: 0.3,
      lightMap: textureNormal,
      // normalMap: textureNormal, //法线贴图
      bumpScale: 3
    }); // 材质对象Material
    // let planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.name = '平面物体ID=' + 1;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    return plane;
  },
  createBoxGeometry (textureLoaderUrl, {x, y, z}) {
    // 创建立方体
    let textureLoader = new THREE.TextureLoader();
    let textureNormal = textureLoader.load(textureLoaderUrl);
    let boxGeometry = new THREE.BoxGeometry(10, 10, 10, 200);
    let texture1 = textureLoader.load(textureLoaderUrl);
    let boxGeometryMaterial = new THREE.MeshLambertMaterial({
      // specular: 0xff0000,//高光部分的颜色
      shininess: 10, //高光部分的亮度，默认30
      normalScale: new THREE.Vector2(2.2, 2.2),
      map: texture1, // 普通纹理贴图
      normalMap: textureNormal, //法线贴图
      bumpMap: textureNormal,
      bumpScale: 0.3
    });
    let box = new THREE.Mesh(boxGeometry, boxGeometryMaterial);
    box.name = '正方物体ID=' + 2;
    box.position.x = x;
    box.position.y = y;
    box.position.z = z;
    box.castShadow = true;
    return box;
  },
  // 点光源
  createSpotLight () {
    // 点光源
    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-60, 40, -20);
    spotLight.castShadow = true;
    return spotLight;
  },
  // 平行光
  createDirectionalLight (target) {
    // 平行光
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
    directionalLight.position.set(-90, 80, -20);
    // 方向光指向对象网格模型mesh2，可以不设置，默认的位置是0,0,0
    // directionalLight.target = target;
    return directionalLight;
  },
  // 环境光
  createAmbient (color = 0x444444) {
    let ambient = new THREE.AmbientLight(color);
    // ambient.castShadow = true;
    return ambient;
  },
  createDatGui () {
    let gui = {
      bump: 0.03,
      animation: false,
    };
  //   let datGui = new GUI();
  //   //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
  //   datGui.add(gui, "bump", -1, 1).onChange(function (e) {
  //     box.material.bumpScale = e;
  //   });
  //   datGui.add(gui, "animation");
  //   return datGui;
  },
  // 创建控制轴
  createControls () {
    let controls = new OrbitControls(webglOBJ.camera, webglOBJ.renderDom);
    return controls;
  },
  // 创建帮助
  createAxisHelper () {
    let axisHelper = new THREE.AxesHelper(250);
    return axisHelper;
  },
  // 初始化webGL对象
  webglRender (Scene, camera) {
    webglOBJ.renderer.render(Scene, camera);
    window.requestAnimationFrame(webglOBJ.webglRender);
  }
};

/**
 * 添加标签：dom方式
 * @param {*} targePosition ：需要传递当前标签的位置
 * @param {*} targetId ：标签对应的dom的唯一ID，暂且用时间戳代替，避免重复
 * @param {*} innerHTML ：标签对应html
 */
export function labelTag (camera, targePosition, targetId, innerHTML, webGLdom) {
  const { width, height } = webGLdom.getBoundingClientRect();
  let worldVector = new THREE.Vector3(targePosition.x, targePosition.y, targePosition.z);
  let vector = worldVector.project(camera);
  let halfWidth = width / 2,
    halfHeight = height / 2;
  let x = Math.round(vector.x * halfWidth + halfWidth);
  let y = Math.round(-vector.y * halfHeight + halfHeight);
  /**
   * 更新立方体元素位置
   */
  let div = document.getElementById(targetId);
  div.style.left = x + 'px';
  div.style.top = y + 'px';
  // div.innerHTML = `uuid:${innerHTML.uuid}`;
}

