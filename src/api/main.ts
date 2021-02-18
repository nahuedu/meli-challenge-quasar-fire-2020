import express from 'express'
import { AllianceFleet } from '../domain/AllianceFleet';
import bodyParser from 'body-parser';
import { SatelliteRepository } from '../repository/SatelliteRepository';

const app = express()
app.use(bodyParser.json())

app.post('/topsecret', async (req, res) => {

  try {
    const repo = new SatelliteRepository();
    let satellites = [];

    for (const s of req.body.satellites) {
      let sat = await repo.getSatelliteByName(s.name);
      sat.receiveMessage(s.distance, s.message);
      satellites.push(sat);
    }

    const fleet = new AllianceFleet(satellites);
  
    const location = fleet.findEnemyLocation();
    const message = fleet.decodeEnemyMsg();

    res.send({
      position: {
        x: location[0],
        y: location[1]
      },
      message: message
    })
  } catch (e) {
    return res.status(404).json(e.message);
  }
})

app.post('/topsecret_split/:name', async (req, res) => {
  try {
    const { body, params } = req;
    const repo = new SatelliteRepository();

    await repo.saveMessage(params.name, body.distance, body.message);
    return res.status(200).end();
  } catch (e) {
    return res.status(500).json(e.message);
  }
})


app.get('/topsecret_split', async (req, res) => {
  try {
    const repo = new SatelliteRepository();
    const satellites = await repo.getAllSatellitesWithLastMsg();
  
    return res.send(satellites);
    
  } catch (e) {
    return res.status(500).json(e.message);
  }
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = '3000';
}

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})