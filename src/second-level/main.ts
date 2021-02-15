import express from 'express'
import { AllianceFleet } from '../domain/AllianceFleet';
import { Satellite } from '../domain/Satellite';
import bodyParser from 'body-parser';

const app = express()
const port = 3000
app.use(bodyParser.json())

app.post('/topsecret', (req, res) => {

  const kenobi = req.body.satellites.find(s => s.name === 'kenobi');
  const skywalker = req.body.satellites.find(s => s.name === 'skywalker');
  const sato = req.body.satellites.find(s => s.name === 'sato');

  const fleet = 
    new AllianceFleet(
      new Satellite(kenobi.name, kenobi.distance, kenobi.message),
      new Satellite(skywalker.name, skywalker.distance, skywalker.message),
      new Satellite(sato.name, sato.distance, sato.message)
    )

  try {
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

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})