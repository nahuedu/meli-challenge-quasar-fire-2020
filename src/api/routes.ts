import { TopSecretController } from "../controller/TopSecretController";
import { SatelliteRepository } from "../repository/SatelliteRepository";

const controller = new TopSecretController(new SatelliteRepository());

export const routes = (app) => {
    app.post('/topsecret', async (req, res) => {

        try {
          res.send(await controller.postTopSecret(req.body.satellites))
        } catch (e) {
          return res.status(404).json(e.message);
        }
      })
      
      app.post('/topsecret_split/:name', async (req, res) => {
        try {
          const { body, params } = req;
          await controller.postTopSecretSplit(params.name, body.distance, body.message);
      
          return res.status(200).end();
        } catch (e) {
          return res.status(500).json(e.message);
        }
      })
      
      
      app.get('/topsecret_split', async (req, res) => {
        try {
          res.send(await controller.getTopSecretSplit())
        } catch (e) {
          return res.status(500).json(e.message);
        }
      })
}