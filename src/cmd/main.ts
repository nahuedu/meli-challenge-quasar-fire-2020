import { AllianceFleet } from "../domain/AllianceFleet";
import { Satellite } from "../domain/Satellite";
import { msg } from "./params";

const kenobiCoord: [number, number] = [-500, -200];
const skywalkerCoord: [number, number] = [100, -100];
const satoCoord: [number, number] = [500, 100];

function getMessage(messages: string[][]): string {
    const kenobi = new Satellite('kenobi', kenobiCoord);
    kenobi.receiveMessage(0, messages[0]);

    const skywalker = new Satellite('skywalker', skywalkerCoord);
    skywalker.receiveMessage(0, messages[1])

    const sato = new Satellite('sato', satoCoord);
    sato.receiveMessage(0, messages[2])

    const fleet = new AllianceFleet([kenobi, skywalker, sato]);

    return fleet.decodeEnemyMsg();
}


function getLocation(distKen: number, distSky: number, distSato: number) {
    const kenobi = new Satellite('kenobi', kenobiCoord);
    kenobi.receiveMessage(distKen, []);

    const skywalker = new Satellite('skywalker', skywalkerCoord);
    skywalker.receiveMessage(distSky, [])

    const sato = new Satellite('sato', satoCoord);
    sato.receiveMessage(distSato, [])

    const fleet = new AllianceFleet([kenobi, skywalker, sato]);

    return fleet.findEnemyLocation();
}

const args = process.argv.slice(2)
const command = args[0];

if(command === 'message') {
    console.log(`Enemy message decoded: '${getMessage(msg)}'`);
} else if(command === 'location') {
    console.log(`Enemy location is: (${getLocation(Number(args[1]), Number(args[2]), Number(args[3]))})`);
} else {
    console.log(`command: ${command} is not available, use 'message' or 'location'`);
}