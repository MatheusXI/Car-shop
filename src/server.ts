import CarController from './controllers/Car/carController';
import { Car } from './interfaces/CarInterface';
import CustomRouter from './routes/router';
import App from './app';

const server = new App();
const carController = new CarController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

server.addRouter(carRouter.router);

server.addErro();

server.startServer();
export default server;
