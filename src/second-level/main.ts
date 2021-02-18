import express from 'express'
import { AllianceFleet } from '../domain/AllianceFleet';
import { Satellite } from '../domain/Satellite';
import bodyParser from 'body-parser';
import { SatelliteRepository } from '../repository/SatelliteRepository';

const app = express()
app.use(bodyParser.json())

function returnEnemyLocation(kenobi: Satellite, skywalker: Satellite, sato: Satellite, response: any) {
  const fleet = new AllianceFleet(kenobi, skywalker, sato)

  try {
    const location = fleet.findEnemyLocation();
    const message = fleet.decodeEnemyMsg();

    response.send({
      position: {
        x: location[0],
        y: location[1]
      },
      message: message
    })
  } catch (e) {
    return response.status(404).json(e.message);
  }
}


app.post('/topsecret', (req, res) => {

  const kenobi = req.body.satellites.find(s => s.name === 'kenobi');
  const skywalker = req.body.satellites.find(s => s.name === 'skywalker');
  const sato = req.body.satellites.find(s => s.name === 'sato');

  return returnEnemyLocation(
    new Satellite(kenobi.name, kenobi.distance, kenobi.message, Satellite.GlobalCoordinates['kenobi']),
    new Satellite(skywalker.name, skywalker.distance, skywalker.message, Satellite.GlobalCoordinates['skywalker']),
    new Satellite(sato.name, sato.distance, sato.message, Satellite.GlobalCoordinates['sato']),
    res
  )
})

app.get('/topsecret_split', async (req, res) => {

  try {
    const repo = new SatelliteRepository();

    const kenobi = await repo.getSatelliteByName('kenobi');
    const skywalker =  await repo.getSatelliteByName('skywalker');
    const sato = await repo.getSatelliteByName('sato');
  
    //returnEnemyLocation(kenobi, skywalker, sato, res);
    return res.send([kenobi, skywalker, sato])
    
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