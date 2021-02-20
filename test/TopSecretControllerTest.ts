import { TopSecretController } from "../src/controller/TopSecretController";
import { SatelliteRepositoryTestMock } from "./SatelliteRepositoryTestMock";

var assert = require('assert');


describe('TopSecretController', function() {
    describe('postTopSecret', function () {
        it('should return enemy data', async function() {
            
            const controller = new TopSecretController(new SatelliteRepositoryTestMock())
            const enemyData = await controller.postTopSecret([
                {
                    name: 'kenobi',
                    distance: 1,
                    message: ['', '', 'un', 'mensaje', 'secreto']
                },
                {
                    name: 'skywalker',
                    distance: 2,
                    message: ['', 'es', '', '', '']
                },
                {
                    name: 'sato',
                    distance: 1,
                    message: ['este', '', 'un', 'mensaje', '']
                }
            ]);

            assert.equal(enemyData.position.x, 0)
            assert.equal(enemyData.position.y, 1)
            assert.equal(enemyData.message, 'este es un mensaje secreto')

        })
    })

    describe('postTopSecretSplit', function() {
        it('should save the message', async function() {
            const controller = new TopSecretController(new SatelliteRepositoryTestMock())
            await controller.postTopSecretSplit('kenobi', 100, ['', '', 'un', 'mensaje', 'secreto']);
        })
    })

    describe('getTopSecretSplit', function() {
        it('should return enemy data from db', async function() {
            const controller = new TopSecretController(new SatelliteRepositoryTestMock())
            const enemyData = await controller.getTopSecretSplit();

            assert.equal(enemyData.position.x, 0)
            assert.equal(enemyData.position.y, 1)
            assert.equal(enemyData.message, 'you were the chosen one')
        })
    })
})