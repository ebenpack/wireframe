var Matrix = require('../../src/math/matrix.js');
var assert = require("assert");

suite('Matrix', function(){
    var zero, zero2, zero3, identity, identity2, identity3, ones, m0, m1, m2, m3, m4, m5, m6, m7;
    setup(function(){
        zero = Matrix.zero();
        zero2 = new Matrix();
        zero3 = Matrix.fromArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
        identity = Matrix.identity();
        identity2 = new Matrix();
        identity3 = Matrix.fromArray([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
        identity2[0] = 1;
        identity2[5] = 1;
        identity2[10] = 1;
        identity2[15] = 1;
        ones = new Matrix();
        m0 = new Matrix();
        m1 = new Matrix();
        m2 = new Matrix();
        m3 = new Matrix();
        m4 = new Matrix();
        m4[0] = 0;
        m4[1] = 1;
        m4[2] = 1;
        m4[3] = 2;
        m4[4] = 3;
        m4[5] = 5;
        m4[6] = 8;
        m4[7] = 13;
        m4[8] = 21;
        m4[9] = 34;
        m4[10] = 55;
        m4[11] = 89;
        m4[12] = 144;
        m4[13] = 233;
        m4[14] = 377;
        m4[15] = 610;
        m5 = Matrix.fromArray([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610]);
        m6 = Matrix.fromArray([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]);
        m7 = Matrix.fromArray([34, 44, 54, 64, 82, 108, 134, 160, 34, 44, 54, 64, 82, 108, 134, 160]);
        for (var i = 0; i < 16; i++){
            ones[i] = 1;
            m0[i] = i;
            m1[i] = i+1;
            m2[i] = i+2;
            m3[i] = i*2;
        }
    });
    suite('properties', function(){
        test('length', function(){
            assert.equal(zero.length, 16);
            assert.equal(zero2.length, 16);
            assert.equal(zero3.length, 16);
            assert.equal(identity.length, 16);
            assert.equal(identity2.length, 16);
            assert.equal(m1.length, 16);
            assert.equal(m2.length, 16);
            assert.equal(m3.length, 16);
            assert.equal(m4.length, 16);
            assert.equal(m5.length, 16);
        });
    });
    suite('methods', function(){
        test('equal', function(){
            assert.ok(identity.equal(identity2));
            assert.ok(zero.equal(zero2));
            assert.ok(zero.equal(zero3));
            assert.ok(zero2.equal(zero3));
            assert.ok(!identity.equal(zero));
            assert.ok(m4.equal(m5));
            assert.ok(!m0.equal(m1));
            assert.ok(!m0.equal(m2));
            assert.ok(!m0.equal(m3));
        });
        test('add', function(){
            var t1 = zero.add(m1);
            var t2 = m0.add(ones);
            var t3 = m0.add(ones).add(ones);
            assert.ok(t1.equal(m1));
            assert.ok(t2.equal(m1));
            assert.ok(t3.equal(m2));
        });
        test('subtract', function(){
            var t1 = m4.subtract(m5);
            var t2 = m1.subtract(ones);
            var t3 = m2.subtract(m1);
            assert.ok(t1.equal(zero));
            assert.ok(t2.equal(m0));
            assert.ok(t3.equal(ones));
        });
        test('multiplyScalar', function(){
            var t1 = m0.multiplyScalar(2);
            var t2 = zero.multiplyScalar(20);
            var t3 = m0.multiplyScalar(1);
            assert.ok(t1.equal(m3));
            assert.ok(t2.equal(zero));
            assert.ok(t3.equal(m0));
        });
        test('multiply', function(){
            var t1 = m6.multiply(m6);
            var t2 = identity.multiply(identity);
            var t3 = identity.multiply(zero);
            var t4 = identity.multiply(m0);
            var t5 = zero.multiply(m0);
            assert.ok(t1.equal(m7));
            assert.ok(t2.equal(identity));
            assert.ok(t3.equal(zero));
            assert.ok(t4.equal(m0));
            assert.ok(t5.equal(zero));
        });
        test('negate', function(){
            var t1 = m0.negate();
            var t2 = m1.negate();
            var t3 = m2.negate();
            var t4 = m3.negate();
            var t5 = zero.negate();
            var t6 = ones.negate();

            assert.ok(zero.equal(t5));
            for (var i = 0; i < 16; i++){
                assert.equal(t1[i], -m0[i]);
                assert.equal(t2[i], -m1[i]);
                assert.equal(t3[i], -m2[i]);
                assert.equal(t4[i], -m3[i]);
            }
            for (var j = 0; j < 16; j++){
                assert.equal(t1[j], -j);
                assert.equal(t6[j], -1);
            }
        });
        test('transpose', function(){
            var transpose_map = {
                0:0, 1:4, 2:8, 3:12, 4:1, 5:5, 6:9, 7:13,
                8:2, 9:6, 10:10, 11:14, 12:3, 13:7, 14:11, 15:15
            }
            var t1 = identity.transpose();
            var t2 = ones.transpose();
            var t3 = zero.transpose();
            var t4 = m0.transpose();
            var t5 = m1.transpose();
            var t6 = m2.transpose();
            var t7 = m3.transpose();

            assert.ok(t1.equal(identity));
            assert.ok(t2.equal(ones));
            assert.ok(t3.equal(zero));
            var t4 = m0.transpose();
            for (var i = 0; i < 16; i++){
                assert.equal(t4[i], m0[transpose_map[i]]);
                assert.equal(t5[i], m1[transpose_map[i]]);
                assert.equal(t6[i], m2[transpose_map[i]]);
                assert.equal(t7[i], m3[transpose_map[i]]);
            }
        });
        test('rotationX', function(){
            
        });
        test('rotationY', function(){
            
        });
        test('rotationZ', function(){
            
        });
        test('rotationAxis', function(){
            
        });
        test('rotation', function(){
            
        });
        test('translation', function(){
            
        });
        test('scale', function(){
            
        });
        test('identity', function(){
            assert.ok(identity.equal(identity2));
            assert.ok(identity.equal(identity3));
            for (var i = 0; i < 16; i++){
                if (i % 5 === 0){
                    assert.equal(identity[i], 1);
                } else {
                    assert.equal(identity[i], 0);
                }
            }
        });
        test('zero', function(){
            assert.ok(zero.equal(zero2));
            assert.ok(zero.equal(zero3));
            for (var i = 0; i < 16; i++){
                assert.equal(zero[i], 0);
            }
        });
        test('fromArray', function(){
            assert.ok(m5.equal(m4));
            assert.ok(zero.equal(zero3));
            assert.ok(zero2.equal(zero3));
            assert.ok(identity.equal(identity3));
            assert.ok(identity2.equal(identity3));
        });
    });
});