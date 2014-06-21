var Vector = require('./vector.js');

/**
 * @constructor
 * @this {Mesh}
 * @param {string} name
 * @param {Array.<Vertex>} vertices
 * @param {Array.<{edge: Array.<number>, color: string}>} edges
 */
function Mesh(name, vertices, faces){
    this.name = name;
    this.vertices = vertices;
    this.faces = faces;
    this.position = new Vector(0, 0, 0);
    this.rotation = {'yaw': 0, 'pitch': 0, 'roll': 0};
    this.scale = {'x': 1, 'y': 1, 'z': 1};
}
/**
 * Returns the normal vector for the given face.
 * @param  {number} index 
 * @return {Vector}
 */
Mesh.prototype.normal = function(index){
    var face = this.faces[index].face;
    var a = this.vertices[face[0]].vector;
    var b = this.vertices[face[1]].vector;
    var c = this.vertices[face[2]].vector;
    var side1 = b.subtract(a);
    var side2 = c.subtract(a);
    var norm = side1.cross(side2);
    if (norm.magnitude() <= 0.00000001){
        return norm;
    } else {
        return norm.normalize();
    }
};
/**
 * Returns the centroid vector for the given face.
 * @param  {number} index 
 * @return {Vector}
 */
Mesh.prototype.centroid = function(index){
    var face = this.faces[index].face;
    var a = this.vertices[face[0]].vector;
    var b = this.vertices[face[1]].vector;
    var c = this.vertices[face[2]].vector;
    return new Vector((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3, (a.z + b.z + c.z) / 3);
};

module.exports = Mesh;