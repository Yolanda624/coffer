import { LoadingManager } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DDSLoader } from "three/examples/jsm/loaders/DDSLoader";
import { TGALoader } from "three/examples/jsm/loaders/TGALoader";

const manager = new LoadingManager();
manager.addHandler(/\.dds$/i, new DDSLoader());
manager.addHandler(/\.tga$/i, new TGALoader());

function getLoader(filePath, fileType) {
  let fileExtension;
  if (fileType) fileExtension = fileType;
  else fileExtension = getExtension(filePath);
  // gltf type has two formats, .gltf and .glb, so make fileExtension glb to gltf
  if (fileExtension === "glb") {
    fileExtension = "gltf";
  }
  let obj = {
    loader: null,
    getObject: null
  };
  switch (fileExtension) {
    case 'gltf':
      obj = {
        loader: new GLTFLoader(manager),
        getObject: gltf => {
          return gltf.scene;
        }
      };
      break;
  }
  return obj;
};

function getExtension(str) {
  const pathSplit = str.split('.');
  if (pathSplit.length <= 1) {
    return "";
  } else {
    let extension = pathSplit.pop();
    extension = extension.toLowerCase();
    return extension;
  }
}

export {
  getLoader
}
