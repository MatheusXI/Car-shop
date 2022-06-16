// import * as sinon from 'sinon';
// import chai from 'chai';
// import chaiHttp = require('chai-http');
// import CarService from '../../../services/Car/carService';
// import server from '../../../server';
// import CarController from '../../../controllers/Car/carController';
// import { Request, Response, NextFunction } from 'express';
// import MotoController from '../../../controllers/Moto/motoController';


// chai.use(chaiHttp);

// const { expect } = chai;

// // const carService = new CarService()
// const motoController = new MotoController()

// server.startServer(3000)

// const request = {} as Request
// const response = {} as Response
// const next = function() {} as NextFunction

// describe('Testa o carController', () => {

//     describe('Testa a função read()', async () => {
    
//       before(async () => {
//         // request.params = {id: 1}
//         response.status = sinon.stub().returns(response)
//         response.json = sinon.stub()
//         sinon
//           .stub(motoController.service, 'read')
//           .resolves([
//               {
//                 model: "Ferrari Maranello",
//                 year: 1963,
//                 color: "red",
//                 buyValue: 3500000,
//                 category: 'Street',
//                 engineCapacity: 2400,
//               }
//           ]);
//       });

      
//       // let res = await chai.request(server.getApp).get('/cars')

//       after(()=>{
//         sinon.restore();
//       })
    
//       it('Testa se a resposta gera um status 200', async () => {
//          await motoController.read(request, response, next)
//         expect((response.status as sinon.SinonStub).calledWith(200)).to.be.equal(true)
//         // expect(response.status).to.eq(200)
//       });

//       // it('testa se a requisição retorna os valores esperados', async () => {
//       //   const cars = await carController.read(request, response, next)
//       //   console.log(response.json as sinon.SinonStub, 'response')
//       //     expect(response.json as sinon.SinonStub).to.have.at;
//       //     // expect(cars?[0].model).to.be.eq("Ferrari Maranello")
//       //     // expect(cars[0].).to.be.eq(1963)
//       //     // expect(cars[0].).to.be.eq("red")
//       //     // expect(cars[0].).to.be.eq(3500000)
//       //     // expect(cars[0].).to.be.eq(2)
//       //     // expect(cars[0].).to.be.eq(2)
//       // })
    
//     });
// })