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
});