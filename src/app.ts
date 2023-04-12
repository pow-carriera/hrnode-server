
import express from 'express';
import { env } from 'process';
import { PORT, APPNAME, HOST} from './utils/config';

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))




app.listen(PORT || 5000, ()=> {
  console.log(`${APPNAME} is running at ${HOST}:${PORT}`)
})