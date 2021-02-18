import { Satellite } from "../src/domain/Satellite";

var assert = require('assert');


describe('Satellite', function() {

  describe('insersectionWith()', function() {
    it('should return both intersection points when circles intersect twice', function() {

        const kenobi = new Satellite('kenobi', [0,0]);
        const sato = new Satellite('sato', [1,1]);

        kenobi.receiveMessage(1, []);
        sato.receiveMessage(1, []);

        const points = kenobi.insersectionWith(sato);

        assert.deepStrictEqual(points, [[0,1], [1,0]]);
    });

    it('should throw error when circles do not intersect', function() {

        const kenobi = new Satellite('kenobi', [0,0]);
        const sato = new Satellite('sato', [2,1]);

        kenobi.receiveMessage(1, []);
        sato.receiveMessage(1, []);

        assert.throws(
            () => kenobi.insersectionWith(sato),
            {
                message: 'Error: cannot find location with given data'
            }
        );
    });

    it('should return same point twice when circles intersect once', function() {

        const kenobi = new Satellite('kenobi', [0,0]);
        const sato = new Satellite('sato', [0,2]);

        kenobi.receiveMessage(1, []);
        sato.receiveMessage(1, []);

        const points = kenobi.insersectionWith(sato);

        assert.deepStrictEqual(points, [[0,1], [0,1]]);
    });
  });
});