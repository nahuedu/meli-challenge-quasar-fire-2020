import { AllianceFleet } from "../domain/AllianceFleet";
import { Satellite } from "../domain/Satellite";
import { IRepository } from "../repository/IRepository";

export class TopSecretController {

    private repository: IRepository

    constructor(repository: IRepository) {
        this.repository = repository;
    }

    async postTopSecret(params) {
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