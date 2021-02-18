import { AllianceFleet } from "../src/domain/AllianceFleet";
import { Satellite } from "../src/domain/Satellite";


var assert = require('assert');


describe('AllianceFleet', function() {

    describe('decodeEnemyMsg()', function() {
        it('should return the complete message', function() {
            const kenobi = new Satellite('kenobi', [0,0]);
            const sato = new Satellite('sato', [0,0]);
            const skywalker = new Satellite('skywalker', [0,0]);

            kenobi.receiveMessage(0, ["", "", "", "trap"]);
            sato.receiveMessage(0, ["", "", "", "is", "a", ""]);
            skywalker.receiveMessage(0, ["", "", "", "it", "is", "a", "trap"]);

            const fleet = new AllianceFleet([kenobi, sato, skywalker]);

            assert.deepStrictEqual(fleet.decodeEnemyMsg(), "it is a trap");

            kenobi.receiveMessage(0, ["", "", "", "were", "the", "", ""]);
            sato.receiveMessage(0, ["", "were", "", "chosen", ""]);
            skywalker.receiveMessage(0, ["", "you", "were", "the", "chosen", "one"]);

            assert.deepStrictEqual(fleet.decodeEnemyMsg(), "you were the chosen one");

            kenobi.receiveMessage(0, ["", "nooooooo"]);
            sato.receiveMessage(0, [""]);
            skywalker.receiveMessage(0, [""]);

            assert.deepStrictEqual(fleet.decodeEnemyMsg(), "nooooooo");
        })
    })

    describe('findEnemyLocation()', function() {
        it('should return enemy coordenates with three satellites', function() {
            const kenobi = new Satellite('kenobi', [0,0]);
            const sato = new Satellite('sato', [1,1]);
            const skywalker = new Satellite('skywalker', [-2,1]);

            kenobi.receiveMessage(1, []);
            sato.receiveMessage(1, []);
            skywalker.receiveMessage(2, []);

            const fleet = new AllianceFleet([kenobi, sato, skywalker]);
            assert.deepStrictEqual(fleet.findEnemyLocation(), [0,1]);
        })

        it('should return enemy coordenates with two satellites that intersect once', function() {
            const kenobi = new Satellite('kenobi', [0,0]);
            const sato = new Satellite('sato', [0,2]);

            kenobi.receiveMessage(1, []);
            sato.receiveMessage(1, []);

            const fleet = new AllianceFleet([kenobi, sato]);
            assert.deepStrictEqual(fleet.findEnemyLocation(), [0,1]);
        })

        it('should throw error with two satellites that intersect twice', function() {
            const kenobi = new Satellite('kenobi', [0,0]);
            const sato = new Satellite('sato', [0,1]);

            kenobi.receiveMessage(1, []);
            sato.receiveMessage(1, []);

            const fleet = new AllianceFleet([kenobi, sato]);
            
            assert.throws(
                () => fleet.findEnemyLocation(),
                {
                    message: 'Not enough active satellites to find enemy location'
                }
            );
        })

        it('should throw error with one satellite', function() {
            const kenobi = new Satellite('kenobi', [0,0]);
            kenobi.receiveMessage(1, []);

            const fleet = new AllianceFleet([kenobi]);
            
            assert.throws(
                () => fleet.findEnemyLocation(),
                {
                    message: 'Not enough active satellites to find enemy location'
                }
            );
        })

        it('should return enemy coordenates with four satellites', function() {
            const bobafett = new Satellite('bobafett', [0,-5]);
            const kenobi = new Satellite('kenobi', [0,0]);
            const sato = new Satellite('sato', [1,1]);
            const skywalker = new Satellite('skywalker', [-2,1]);

            bobafett.receiveMessage(6, []);
            kenobi.receiveMessage(1, []);
            sato.receiveMessage(1, []);
            skywalker.receiveMessage(2, []);

            const fleet = new AllianceFleet([bobafett, kenobi, sato, skywalker]);
            assert.deepStrictEqual(fleet.findEnemyLocation(), [0,1]);
        })

        it('should throw error with wrong data', function() {
            const kenobi = new Satellite('kenobi', [1,0]);
            const sato = new Satellite('sato', [1,1]);
            const skywalker = new Satellite('skywalker', [-2,1]);

            kenobi.receiveMessage(1, []);
            sato.receiveMessage(1, []);
            skywalker.receiveMessage(2, []);

            const fleet = new AllianceFleet([kenobi, sato, skywalker]);
            assert.throws(
                () => fleet.findEnemyLocation(),
                {
                    message: 'Error: cannot find location with given data'
                }
            );
        })
    })
});