import { Satellite } from "../src/domain/Satellite";
import { IRepository } from "../src/repository/IRepository";

export class SatelliteRepositoryTestMock implements IRepository {
    private testSatellites: Satellite[]

    constructor() {
        const kenobi = new Satellite('kenobi', [0,0]);
        const sato = new Satellite('sato', [1,1]);
        const skywalker = new Satellite('skywalker', [-2,1]);

        kenobi.receiveMessage(1, ['you', 'were', 'the', 'chosen', '']);
        sato.receiveMessage(1, ['', '', 'were', '', 'one']);
        skywalker.receiveMessage(2, ['you', '', 'were', '', '']);

        this.testSatellites = [kenobi, sato, skywalker]
    }

    async saveMessage(name: string, distance: number, message: [string]): Promise<void> {
        return Promise.resolve();
    }

    async getSatelliteByName(name: string): Promise<Satellite> {
        return Promise.resolve(this.testSatellites.find(s => s.getName() === name))
    }

    async getAllSatellitesWithLastMsg(): Promise<Satellite[]> {
        return Promise.resolve(this.testSatellites)
    }

}