import { Client } from 'pg';
import { Satellite } from '../domain/Satellite';

export class SatelliteRepository {

  async saveMessage(name: string, distance: number, message: [string]) {
    
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: false
    });
    
    try {
      await client.connect();
      await client.query('BEGIN')
      const queryText = 'INSERT INTO MESSAGE(DISTANCE, DATE, SATELLITE_ID) SELECT $1, NOW(), ID from SATELLITE WHERE NAME = $2 RETURNING id'
      const res = await client.query(queryText, [distance, name])
      
      for (let i = 0; i < message.length; i++) {
        const insertWord = 'INSERT INTO MSG_WORD(WORD,POS,MESSAGE_ID) VALUES ($1,$2,$3)'
        await client.query(insertWord, [message[i], i+1, res.rows[0].id])
      }
      
      await client.query('COMMIT')
      await client.end()
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } 
  }


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