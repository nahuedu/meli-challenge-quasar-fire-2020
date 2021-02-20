import { AllianceFleet } from "../domain/AllianceFleet";
import { Satellite } from "../domain/Satellite";
import { SatelliteRepository } from "../repository/SatelliteRepository";

export class TopSecretController {

    private repository: SatelliteRepository

    constructor(repository: SatelliteRepository) {
        this.repository = repository;
    }

    async postTopSecret(params) {
        const repo = new SatelliteRepository();
        let satellites = [];

        for (const s of params) {
            let sat = await this.repository.getSatelliteByName(s.name);
            sat.receiveMessage(s.distance, s.message);
            satellites.push(sat);
        }

        return this.getEnemyData(satellites);
    }

    async postTopSecretSplit(satelliteName: any, distance: any, message: any) {
        await this.repository.saveMessage(satelliteName, distance, message);
    }

    async getTopSecretSplit() {
        const satellites = await this.repository.getAllSatellitesWithLastMsg();
        return this.getEnemyData(satellites);
    }

    private getEnemyData(satellites: Satellite[]) {
        const fleet = new AllianceFleet(satellites);
        const location = fleet.findEnemyLocation();
        const message = fleet.decodeEnemyMsg();

        return {
            position: {
                x: location[0],
                y: location[1]
            },
            message: message
        }
    }
    
}