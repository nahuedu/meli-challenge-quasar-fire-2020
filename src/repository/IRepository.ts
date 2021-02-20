import { Satellite } from "../domain/Satellite";

export interface IRepository {

    saveMessage(name: string, distance: number, message: [string]): void;
    getSatelliteByName(name: string): Promise<Satellite>;
    getAllSatellitesWithLastMsg(): Promise<Satellite[]>;
}