// import { expect } from 'chai';
// import mongoose from 'mongoose';

import { expect } from "chai";
import { describe } from "mocha";
import Sinon from "sinon";
import CarModel from "../../../models/Car/carSchema";
import CarService from "../../../services/Car/carService";
import { mockResult, mockResults } from "../mocks/mockSucess";


describe('Testa o carService', () => {
    const modelMock = {
        read: Sinon.stub().resolves(mockResults),
        readOne: Sinon.stub().resolves(mockResult),
        create:  Sinon.stub().resolves(mockResult)
    } as unknown as CarModel

    const carService = new CarService(modelMock)
    describe('Testa a função read()', () => {
        it('Testa se a função retorna os dados corretos', async() => {
         const cars = await carService.read();
         expect(cars).to.be.deep.eq(mockResults)
        })
    });
    describe('Testa a função readOne()', () => {
        it('Testa se a função retorna os valores corretos', async () => {

        const car = await carService.readOne('62aa2f5058bd0c3cb2a0f2a8');
        expect(car).to.be.deep.eq(mockResult)
        })
    })
    describe('Testa a função create()', () => {
        it('Testa se a função retorna os valores corretos', async () => {

        const car = await carService.create(mockResult);
        expect(car).to.be.deep.eq(mockResult)
        })
    })
})