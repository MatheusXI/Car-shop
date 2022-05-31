import CarController from './controllers/Car/carController';
import MotoController from './controllers/Moto/motoController';
import { Car } from './interfaces/CarInterface';
import CustomRouter from './routes/router';
import App from './app';
import { Motorcycle } from './interfaces/MotorcycleInterface';

const server = new App();
const carController = new CarController();
const motoController = new MotoController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

const motoRouter = new CustomRouter<Motorcycle>();
motoRouter.addRoute(motoController);

server.addRouter(carRouter.router);
server.addRouter(motoRouter.router);

server.addErro();

server.startServer();
export default server;
