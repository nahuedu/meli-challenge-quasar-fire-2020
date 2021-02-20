import express from 'express'
import bodyParser from 'body-parser';
import { routes } from './routes';

const app = express()
app.use(bodyParser.json())

routes(app);

let port = process.env.PORT;
if (port == null || port == "") {
  port = '3000';
}

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})