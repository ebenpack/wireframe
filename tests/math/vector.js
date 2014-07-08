var Vector = require('../../src/math/vector.js');
var assert = require("assert");

suite('Vector', function(){
    var origin, vector1, vector2, vector3, vector4, vector5, vectorx, vectory, vectorz;
    var vector100x, vector200y, vector300z, vector123, vector112;
    var epsilon = 0.01;
    function nearlyEqual(a, b, eps){
        if (typeof eps === "undefined") {eps = epsilon;}
        var diff = Math.abs(a - b);
        return (diff < eps);
    }
    setup(function(){
        origin = new Vector(0, 0, 0);
        vector1 = new Vector(1, 1, 1);
        vector2 = new Vector(1, 1, 1);
        vector3 = new Vector(10, 10, 10);
        vector4 = new Vector(11, 11, 11);
        vector5 = new Vector(-1, -1, -1);
        vectorx = new Vector(1, 0, 0);
        vectory = new Vector(0, 1, 0);
        vectorz = new Vector(0, 0, 1);
        vector100x = new Vector(100, 0, 0);
        vector200y = new Vector(0, 200, 0);
        vector300z = new Vector(0, 0, 300);
        vector123 = new Vector(1, 2, 3);
        vector112 = new Vector(-1, 1, 2);
    });
    suite('properties', function(){
        test('axes', function(){
            assert.throws(function(){new Vector();}, Error);
            assert.ok(vector1.x);
            assert.ok(vector1.y);
            assert.ok(vector1.z);
        });
    });
    suite('methods', function(){
        test('add', function(){
            var t1 = vector1.add(vector3);
            var t2 = vector1.add(vector5);
            assert.ok(vector1.add(vector3).equal(vector4));
            assert.ok(vector1.add(vector5).equal(origin));
            assert.equal(t1.x, 11);
            assert.equal(t1.y, 11);
            assert.equal(t1.z, 11);
            assert.equal(t2.x, 0);
            assert.equal(t2.y, 0);
            assert.equal(t2.z, 0);
        });
        test('subtract', function(){
            var t1 = vector4.subtract(vector1);
            var t2 = vector1.subtract(vector2);
            assert.ok(vector4.subtract(vector1).equal(vector3));
            assert.ok(vector1.subtract(vector2).equal(origin));
            assert.equal(t1.x, 10);
            assert.equal(t1.y, 10);
            assert.equal(t1.z, 10);
            assert.equal(t2.x, 0);
            assert.equal(t2.y, 0);
            assert.equal(t2.z, 0);
        });
        test('equal', function(){
            assert.equal(vector1.equal(vector2), true);
            assert.equal(vector1.equal(vector3), false);
        });
        test('angle', function(){
            assert.ok(nearlyEqual(vectorx.angle(vectory), Math.PI / 2));
            assert.ok(nearlyEqual(vectory.angle(vectorz), Math.PI / 2));
            assert.ok(nearlyEqual(vectorx.angle(vectorz), Math.PI / 2));
            assert.ok(nearlyEqual(vector1.angle(vector2), 0));
            assert.ok(nearlyEqual(vector1.angle(vector5), Math.PI));
        });
        test('cosAngle', function(){
            assert.ok(nearlyEqual(Math.acos(vectorx.cosAngle(vectory)), (Math.PI / 2)));
            assert.ok(nearlyEqual(Math.acos(vectory.cosAngle(vectorz)), (Math.PI / 2)));
            assert.ok(nearlyEqual(Math.acos(vectorx.cosAngle(vectorz)), (Math.PI / 2)));
            assert.ok(nearlyEqual(Math.acos(vector1.cosAngle(vector2)), 0));
            assert.ok(nearlyEqual(Math.acos(vector1.cosAngle(vector5)), Math.PI));
        });
        test('magnitude', function(){
            assert.equal(vectorx.magnitude(), 1);
            assert.equal(vectory.magnitude(), 1);
            assert.equal(vectorz.magnitude(), 1);
            assert.ok(nearlyEqual(vector1.magnitude(), Math.sqrt(3)));
            assert.ok(nearlyEqual(vector5.magnitude(), Math.sqrt(3)));
            assert.ok(nearlyEqual(vector3.magnitude(), Math.sqrt(300)));
        });
        test('magnitudeSquared', function(){
            assert.equal(vectorx.magnitudeSquared(), 1);
            assert.equal(vectory.magnitudeSquared(), 1);
            assert.equal(vectorz.magnitudeSquared(), 1);
            assert.equal(vector1.magnitudeSquared(), 3);
            assert.equal(vector5.magnitudeSquared(), 3);
            assert.equal(vector3.magnitudeSquared(), 300);
        });
        test('dot', function(){
            assert.equal(vector1.dot(vector2), 3);
            assert.equal(vector2.dot(vector3), 30);
            assert.equal(vector3.dot(vector5), -30);
            assert.equal(vectorx.dot(vectory), 0);
            assert.equal(vectorx.dot(vectorz), 0);
            assert.equal(vectory.dot(vectorz), 0);
        });
        test('cross', function(){
            var t1 = vector123.cross(vector112);
            assert.ok(vectorx.cross(vectory).equal(vectorz));
            assert.ok(vectory.cross(vectorz).equal(vectorx));
            assert.ok(vectorz.cross(vectorx).equal(vectory));
            assert.ok(!vectory.cross(vectorx).equal(vectorz));
            assert.ok(!vectorz.cross(vectory).equal(vectorx));
            assert.ok(!vectorx.cross(vectorz).equal(vectory));
            assert.equal(vectorx.cross(vectory).z, 1);
            assert.equal(vectory.cross(vectorz).x, 1);
            assert.equal(vectorz.cross(vectorx).y, 1);
            assert.equal(t1.x, 1);
            assert.equal(t1.y, -5);
            assert.equal(t1.z, 3);

        });
        test('normalize', function(){
            assert.equal(vector100x.normalize().x, 1);
            assert.equal(vector200y.normalize().y, 1);
            assert.equal(vector300z.normalize().z, 1);
        });
        test('scale', function(){
            assert.ok(vectorx.scale(100).equal(vector100x));
            assert.ok(vectory.scale(200).equal(vector200y));
            assert.ok(vectorz.scale(300).equal(vector300z));
            assert.ok(vector1.scale(10).equal(vector3));
            assert.ok(vector1.scale(11).equal(vector4));
        });
        test('negate', function(){
            assert.ok(vector1.negate().equal(vector5));
            assert.ok(vector1.negate().negate().equal(vector1));
        });
        test('vectorProjection', function(){
            var t1 = vectorx.vectorProjection(vectory);
            var t2 = vector1.vectorProjection(vector3);
            var t3 = vector123.vectorProjection(vector112);
            assert.ok(nearlyEqual(t1.x, 0));
            assert.ok(nearlyEqual(t1.y, 0));
            assert.ok(nearlyEqual(t1.z, 0));
            assert.ok(nearlyEqual(t2.x, 1));
            assert.ok(nearlyEqual(t2.y, 1));
            assert.ok(nearlyEqual(t2.z, 1));
            assert.ok(nearlyEqual(t3.x, -1.167));
            assert.ok(nearlyEqual(t3.y, 1.16));
            assert.ok(nearlyEqual(t3.z, 2.33));
        });
        test('scalarProjection', function(){
            assert.ok(nearlyEqual(vectorx.scalarProjection(vectory), 0));
            assert.ok(nearlyEqual(vectory.scalarProjection(vectorz), 0));
            assert.ok(nearlyEqual(vectory.scalarProjection(vectorz), 0));
            assert.ok(nearlyEqual(vector1.scalarProjection(vector3), 1.73));
            assert.ok(nearlyEqual(vector123.scalarProjection(vector112), 2.85));
        });
        test('transform', function(){

        });
        test('rotate', function(){
            var rot1 = vectorx.rotate(vectory, Math.PI / 2);
            var rot2 = vectorx.rotate(vectory, Math.PI);
            var rot3 = vectorx.rotate(vectory, ((3*Math.PI) / 2));
            var rot4 = vectorx.rotate(vectory, 2*Math.PI);
            assert.ok(nearlyEqual(rot1.x, 0));
            assert.ok(nearlyEqual(rot1.y, 0));
            assert.ok(nearlyEqual(rot1.z, -1));
            assert.ok(nearlyEqual(rot2.x, -1));
            assert.ok(nearlyEqual(rot2.y, 0));
            assert.ok(nearlyEqual(rot2.z, 0));
            assert.ok(nearlyEqual(rot3.x, 0));
            assert.ok(nearlyEqual(rot3.y, 0));
            assert.ok(nearlyEqual(rot3.z, 1));
            assert.ok(nearlyEqual(rot4.x, 1));
            assert.ok(nearlyEqual(rot4.y, 0));
            assert.ok(nearlyEqual(rot4.z, 0));
        });
        test('rotateX', function(){
            var rot1 = vectorz.rotateX(Math.PI / 2);
            var rot2 = vectorz.rotateX(Math.PI);
            var rot3 = vectorz.rotateX(((3*Math.PI) / 2));
            var rot4 = vectorz.rotateX(2*Math.PI);
            assert.ok(nearlyEqual(rot1.x, 0));
            assert.ok(nearlyEqual(rot1.y, -1));
            assert.ok(nearlyEqual(rot1.z, 0));
            assert.ok(nearlyEqual(rot2.x, 0));
            assert.ok(nearlyEqual(rot2.y, 0));
            assert.ok(nearlyEqual(rot2.z, -1));
            assert.ok(nearlyEqual(rot3.x, 0));
            assert.ok(nearlyEqual(rot3.y, 1));
            assert.ok(nearlyEqual(rot3.z, 0));
            assert.ok(nearlyEqual(rot4.x, 0));
            assert.ok(nearlyEqual(rot4.y, 0));
            assert.ok(nearlyEqual(rot4.z, 1));
        });
        test('rotateY', function(){
            var rot1 = vectorx.rotateY(Math.PI / 2);
            var rot2 = vectorx.rotateY(Math.PI);
            var rot3 = vectorx.rotateY(((3*Math.PI) / 2));
            var rot4 = vectorx.rotateY(2*Math.PI);
            assert.ok(nearlyEqual(rot1.x, 0));
            assert.ok(nearlyEqual(rot1.y, 0));
            assert.ok(nearlyEqual(rot1.z, -1));
            assert.ok(nearlyEqual(rot2.x, -1));
            assert.ok(nearlyEqual(rot2.y, 0));
            assert.ok(nearlyEqual(rot2.z, 0));
            assert.ok(nearlyEqual(rot3.x, 0));
            assert.ok(nearlyEqual(rot3.y, 0));
            assert.ok(nearlyEqual(rot3.z, 1));
            assert.ok(nearlyEqual(rot4.x, 1));
            assert.ok(nearlyEqual(rot4.y, 0));
            assert.ok(nearlyEqual(rot4.z, 0));
        });
        test('rotateZ', function(){
            var rot1 = vectory.rotateZ(Math.PI / 2);
            var rot2 = vectory.rotateZ(Math.PI);
            var rot3 = vectory.rotateZ(((3*Math.PI) / 2));
            var rot4 = vectory.rotateZ(2*Math.PI);
            assert.ok(nearlyEqual(rot1.x, -1));
            assert.ok(nearlyEqual(rot1.y, 0));
            assert.ok(nearlyEqual(rot1.z, 0));
            assert.ok(nearlyEqual(rot2.x, 0));
            assert.ok(nearlyEqual(rot2.y, -1));
            assert.ok(nearlyEqual(rot2.z, 0));
            assert.ok(nearlyEqual(rot3.x, 1));
            assert.ok(nearlyEqual(rot3.y, 0));
            assert.ok(nearlyEqual(rot3.z, 0));
            assert.ok(nearlyEqual(rot4.x, 0));
            assert.ok(nearlyEqual(rot4.y, 1));
            assert.ok(nearlyEqual(rot4.z, 0));
        });
        test('rotatePitchYawRoll', function(){
            var rot1 = vectorx.rotatePitchYawRoll(Math.PI / 2, Math.PI / 2, Math.PI / 2);
            assert.ok(nearlyEqual(rot1.x, 0));
            assert.ok(nearlyEqual(rot1.y, 0));
            assert.ok(nearlyEqual(rot1.z, -1));
        });
    });
});