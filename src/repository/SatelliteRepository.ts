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
    let res = await client.query('SELECT ID,NAME,COORDINATE_X,COORDINATE_Y FROM SATELLITE WHERE NAME = $1', [name])

    if(res.rows.length === 0)
      throw new Error(`Satellite ${name} does not exist`)

    const satellite = res.rows[0];
    return new Satellite(satellite.name, [satellite.coordinate_x, satellite.coordinate_y])
  }

  async getLastMessageFrom(name: string) {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: false
    });
      
    await client.connect();
    let res = await client.query('SELECT ID,NAME,COORDINATE_X,COORDINATE_Y FROM SATELLITE WHERE NAME = $1', [name])

    if(res.rows.length === 0)
      throw new Error(`Satellite ${name} does not exist`)

    const satellite = res.rows[0];
    res = await client.query('SELECT ID, DISTANCE FROM MESSAGE WHERE SATELLITE_ID = $1 ORDER BY DATE DESC LIMIT 1', [satellite.id])

    if(res.rows.length === 0)
      return { distance:0, message:[] } 

    const message = res.rows[0];
    res = await client.query('SELECT WORD FROM MSG_WORD WHERE MESSAGE_ID = $1 ORDER BY POS ASC', [message.id])
    const words = res.rows;
    await client.end();
    
    return { distance:message.distance, message:words.map(w => w.word) }
  }

  async getAllSatellites(): Promise<Satellite[]> {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: false
    });
      
    await client.connect();
    let res = await client.query('SELECT ID,NAME,COORDINATE_X,COORDINATE_Y FROM SATELLITE')

    return res.rows.map(r => {
      return new Satellite(r.name, [r.coordinate_x, r.coordinate_y])
    })
  }

  async getAllSatellitesWithLastMsg() {
    const satellites = await this.getAllSatellites();

    for (const sat of satellites) {
      const lastMsg = await this.getLastMessageFrom(sat.getName());
      sat.receiveMessage(lastMsg.distance, lastMsg.message);
    }

    return satellites;
  }

}