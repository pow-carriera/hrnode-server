
import express from 'express';
import { env } from 'process';
import { PORT, APPNAME, HOST} from './utils/config';
import * as routes from './routes/routes';
import morgan from 'morgan'

const app = express();
const apiRouter = express.Router();

app.use(morgan('common'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', ()=> {

})
app.use('/api', apiRouter);

apiRouter.use('/users', routes.userRouter);

app.listen(PORT || 5000, ()=> {
  console.log(`${APPNAME} is running at ${HOST}:${PORT}`)
});