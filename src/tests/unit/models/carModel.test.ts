import { expect } from "chai";
import { describe } from "mocha";
import Sinon from "sinon";
import CarModel from "../../../models/Car/carSchema";
import { mockResult, mockResults } from "../mocks/mockSucess";
import { Model as M, Document } from "mongoose";
import { Car } from "../../../interfaces/CarInterface";

describe("Testa a carModel", () => {
  const mockDocument = {
    find: Sinon.stub().resolves(mockResults),
    findOne: Sinon.stub().resolves(mockResult),
    create:  Sinon.stub().resolves(mockResult),
    updateOne: Sinon.spy(),
    deleteOne: Sinon.spy(),
  } as unknown as M<Car & Document>;

  const carModel = new CarModel(mockDocument);
    describe("Testa a função read()", () => {
        it("testa se a função retorna os valores corretos", async () => {
        const cars = await carModel.read();
        expect(cars).to.be.eq(mockResults);
        });
  });
  describe("Testa a função readOne()", () => {
    it("testa se a função retorna os valores corretos", async () => {
    const car = await carModel.readOne('62aa2f5058bd0c3cb2a0f2a8');
    expect(car).to.be.eq(mockResult);
    });
  });
  describe("Testa a função update()", () => {
    it("testa se a função retorna os valores corretos", async () => {
    const car = await carModel.update('62aa2f5058bd0c3cb2a0f2a8', mockResult);
    expect(car).to.be.eq(mockResult);
    });
  });
  describe("Testa a função delete()", () => {
    it("testa se a função retorna os valores corretos", async () => {
    const car = await carModel.delete('62aa2f5058bd0c3cb2a0f2a8');
    expect(car).to.be.eq(mockResult);
    });
  });  
});
