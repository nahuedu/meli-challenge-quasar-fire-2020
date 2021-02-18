import { AllianceFleet } from "../domain/AllianceFleet";
import { Satellite } from "../domain/Satellite";

function getMessage(messages: string[][]): string {
    const kenobi = new Satellite('kenobi', 0, messages[0], Satellite.GlobalCoordinates['kenobi']);
    const skywalker = new Satellite('skywalker', 0, messages[1], Satellite.GlobalCoordinates['skywalker']);
    const sato = new Satellite('sato', 0, messages[2], Satellite.GlobalCoordinates['sato']);

    const fleet = new AllianceFleet(kenobi, skywalker, sato);

    return fleet.decodeEnemyMsg();
}


function getLocation(distKen: number, distSky: number, distSato: number) {
    const kenobi = new Satellite('kenobi', distKen, [], Satellite.GlobalCoordinates['kenobi']);
    const skywalker = new Satellite('skywalker', distSky, [], Satellite.GlobalCoordinates['skywalker']);
    const sato = new Satellite('sato', distSato, [], Satellite.GlobalCoordinates['sato']);

    const fleet = new AllianceFleet(kenobi, skywalker, sato);

    return fleet.findEnemyLocation();
}

console.log(getMessage([
    ['', '', '', '', ''],
    ['este', '', 'un', ''],
    ['', '', 'es', '', 'mensaje']
]));
console.log(getLocation(2, 1, 1));