import express from 'express'
import { AllianceFleet } from '../domain/AllianceFleet';
import bodyParser from 'body-parser';
import { SatelliteRepository } from '../repository/SatelliteRepository';

const app = express()
app.use(bodyParser.json())

app.post('/topsecret', async (req, res) => {

  try {
    const repo = new SatelliteRepository();

    const kenobiMsg = req.body.satellites.find(s => s.name === 'kenobi');
    const skywalkerMsg = req.body.satellites.find(s => s.name === 'skywalker');
    const satoMsg = req.body.satellites.find(s => s.name === 'sato');

    const kenobi = await repo.getSatelliteByName('kenobi');
    const skywalker = await repo.getSatelliteByName('skywalker');
    const sato = await repo.getSatelliteByName('sato');

    kenobi.receiveMessage(kenobiMsg.distance, kenobiMsg.message);
    skywalker.receiveMessage(skywalkerMsg.distance, skywalkerMsg.message);
    sato.receiveMessage(satoMsg.distance, satoMsg.message);

    const fleet = new AllianceFleet(kenobi, skywalker, sato);
  
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

    const kenobi = await repo.getSatelliteWithLastMsg('kenobi');
    const skywalker =  await repo.getSatelliteWithLastMsg('skywalker');
    const sato = await repo.getSatelliteWithLastMsg('sato');
  
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