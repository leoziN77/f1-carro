"""Run in Blender. Imports an inspection copy; never replaces website geometry."""
import bpy, json, math, os
from mathutils import Matrix, Quaternion

project = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with open(os.path.join(project, 'artifacts', 'car-geometry.json'), encoding='utf-8') as f:
    data = json.load(f)
collection = bpy.data.collections.new('F1 2026 — geometria original')
bpy.context.scene.collection.children.link(collection)
root = bpy.data.objects.new('F1 • Three.js → Blender', None)
collection.objects.link(root)
root.rotation_euler.x = math.pi / 2
root['origem'] = data['source']
root['commit'] = data['commit']
meshes, materials = {}, {}
for key, value in data['materials'].items():
    material = bpy.data.materials.new('F1_' + key[:8])
    material.use_nodes = True
    rgba = (*value['color'], 1)
    material.diffuse_color = rgba
    shader = next(n for n in material.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
    shader.inputs['Base Color'].default_value = rgba
    shader.inputs['Metallic'].default_value = value['metalness']
    shader.inputs['Roughness'].default_value = value['roughness']
    materials[key] = material
for key, value in data['geometries'].items():
    mesh = bpy.data.meshes.new('F1_' + key[:8])
    flat = value['positions']
    vertices = list(zip(flat[::3], flat[1::3], flat[2::3]))
    indices = value['indices'] if value['indices'] is not None else list(range(len(vertices)))
    faces = list(zip(indices[::3], indices[1::3], indices[2::3]))
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    for polygon in mesh.polygons:
        polygon.use_smooth = True
    meshes[key] = mesh

parts = []
def add(node, parent):
    obj = bpy.data.objects.new(node['name'], meshes.get(node.get('geometry')))
    collection.objects.link(obj)
    obj.parent = parent
    m = node['matrix']
    obj.matrix_basis = Matrix([[m[c*4+r] for c in range(4)] for r in range(4)])
    if 'material' in node:
        if not obj.data.materials:
            obj.data.materials.append(materials[node['material']])
        obj.material_slots[0].link = 'OBJECT'
        obj.material_slots[0].material = materials[node['material']]
    if 'part' in node:
        p = node['part']
        for key, value in p.items():
            obj[key] = value
        parts.append(obj)
        base = obj.location.copy()
        for frame, amount in [(1,0),(60,1),(120,0)]:
            obj.location = base + __import__('mathutils').Vector(p['explode']) * amount
            obj.keyframe_insert(data_path='location', frame=frame)
        obj.location = base
    if 'pivot' in node:
        obj['active_aero'] = json.dumps(node['pivot'])
    for child in node['children']:
        add(child, obj)
    return obj
car = add(data['tree'], root)
for frame, lift in [(1,0),(60,1),(120,0)]:
    car.location.y = lift
    car.keyframe_insert(data_path='location', frame=frame)
scene = bpy.context.scene
scene.frame_start, scene.frame_end = 1, 120
scene.frame_set(1)
for area in bpy.context.screen.areas:
    if area.type == 'VIEW_3D':
        area.spaces.active.shading.color_type = 'MATERIAL'
        area.spaces.active.region_3d.view_distance = 9
        area.spaces.active.region_3d.view_location = (0,0,.5)
        area.spaces.active.region_3d.view_rotation = Quaternion((.82,.36,.17,.4)).normalized()
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(project,'artifacts','f1-inspecao.blend'))
print(json.dumps({'parts':len(parts),'objects':len(collection.objects),'file':bpy.data.filepath}))
