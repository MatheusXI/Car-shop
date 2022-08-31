import * as sinon from "sinon";
import chai from "chai";
import CarService from "../../../services/Car/carService";
import CarController from "../../../controllers/Car/carController";
import { Request, Response, NextFunction } from "express";
import { mockResult, mockResults } from "../mocks/mockSucess";

// chai.use(chaiHttp);

const { expect } = chai;

// const carService = new CarService()

// server.startServer(3002)

let request = {} as Request;
const response = {} as Response;
let next = function () {} as NextFunction;

describe("Testa o carController", () => {
  describe("Testa a função read()", () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.spy();
    });

    after(() => {
      sinon.restore();
    });

    it("Testa se a resposta gera um status 200", async () => {
      const mockService = {
        read: sinon.stub().resolves(mockResults),
      } as unknown as CarService;
      const carController = new CarController(mockService);
      await carController.read(request, response, next);
      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.equal(
        true
      );
      // expect(response.status).to.eq(200)
    });

    it("Testa se a resposta retorna um json com o resultado esperado", async () => {
      const mockService = {
        read: sinon.stub().resolves(mockResults),
      } as unknown as CarService;
      const carController = new CarController(mockService);
      await carController.read(request, response, next);
      console.log(response.json, "json");
      expect(
        (response.json as sinon.SinonSpy).calledWith(mockResults)
      ).to.be.equal(true);
    });
  });
  describe("Testa a função readOne", () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.spy();
      request = {
        body: mockResult,
        params: {
          id: '1'
        }
      } as unknown as Request

      next = sinon.spy() as unknown as NextFunction
    });

    after(() => {
      sinon.restore();
    });

    it("Testa que a requisição retorna o status 201 quando bem sucedida", async () => {
      request.params.id = '62aa2f5058bd0c3cb2a0f2a8'
      const mockService = {
        readOne: sinon.stub().resolves(mockResult),
      } as unknown as CarService;
      const carController = new CarController(mockService);
      await carController.readOne(request, response, next);
      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.equal(
        true
      );
    });

    it("Testa que a requisição retorna o json esperado", async () => {
      const mockService = {
        readOne: sinon.stub().resolves(mockResult),
      } as unknown as CarService;
      const carController = new CarController(mockService);
      const car = await carController.readOne(request, response, next);
      console.log(car, 'car')
      expect(
        (response.json as sinon.SinonSpy).calledWith(mockResult)
      ).to.be.equal(true);
      
    });

    it("Testa que a requisição chama a função next quando mal sucedida", async () => {
      request.params.id = '62aa2f5058bd0c3cb2a0f2a'
      const mockService = {
        readOne: sinon.stub().throws({message: 'erro'}),
      } as unknown as CarService;
      const carController = new CarController(mockService);
      await carController.readOne(request, response, next);
      console.log(response, 'req')
      expect((next as sinon.SinonSpy).calledOnce).to.be.true;
    });
  });
});

// const carService = new CarService()
// const motoController = new MotoController()

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
