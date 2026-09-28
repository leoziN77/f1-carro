// Exporta a geometria real do site, mantendo hierarquia, matrizes e metadados.
import fs from 'node:fs';
import { createCanvas } from '@napi-rs/canvas';
import { buildCar } from '../src/car/build.js';
import { Color } from 'three';
globalThis.document = { createElement: (tag) => {
  if (tag !== 'canvas') throw new Error(`Elemento não suportado: ${tag}`);
  return createCanvas(1, 1);
}};
const { root, reg, aero } = buildCar();
const geometries = {}, materials = {};
function serialize(o) {
  o.updateMatrix();
  const node = { name:o.name || o.type, type:o.type, matrix:o.matrix.toArray(), children:o.children.map(serialize) };
  const u=o.userData;
  if (u.isPart) node.part = {id:u.partId,info:u.infoId,layer:u.layer,explode:u.explode.toArray(),delay:u.delay,xray:u.xray};
  for(const [wing,handle] of Object.entries(aero)) {
    const i=handle.flapPivots.indexOf(o);
    if(i>=0) node.pivot={wing,index:i,angle:handle.flapAngles[i]};
  }
  if (o.isMesh) {
    const g=o.geometry,m=o.material;
    geometries[g.uuid] ??= {positions:Array.from(g.attributes.position.array),indices:g.index?Array.from(g.index.array):null};
    materials[m.uuid] ??= {color:m.userData.livery?new Color('#4a0710').toArray():m.map?new Color('#171719').toArray():m.color?.toArray()??[.3,.3,.3],livery:!!m.userData.livery,metalness:m.metalness??0,roughness:m.roughness??.5};
    node.geometry=g.uuid;node.material=m.uuid;
  }
  return node;
}
const tree=serialize(root);
fs.mkdirSync('artifacts',{recursive:true});
fs.writeFileSync('artifacts/car-geometry.json',JSON.stringify({source:'bddicken/formula1',commit:'4c21f009cde1e69b553ab1fd8a9d47f5921f9a30',coordinates:'Three.js Y-up; preserve under +90 degree X root in Blender',tree,geometries,materials}));
console.log(JSON.stringify({parts:reg.parts.size,geometries:Object.keys(geometries).length,materials:Object.keys(materials).length}));
