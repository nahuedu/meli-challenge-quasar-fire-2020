import { Client } from 'pg';
import { Satellite } from '../domain/Satellite';

export class SatelliteRepository {


  async getSatelliteByName(name: string) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: false
    });
      
    await client.connect();
    const res = await client.query('SELECT NAME,COORDINATE_X,COORDINATE_Y FROM SATELLITE WHERE NAME = $1;', [name])
    await client.end();
    
    const row = res.rows[0];
    return new Satellite(row.name, 0, [], [row.coordinate_x, row.coordinate_y])
  }

}