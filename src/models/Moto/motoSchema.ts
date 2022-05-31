import { Document, Schema, model as createModel } from 'mongoose';
import MongoModel from '../MongoModel/mongoModel';
import { Motorcycle } from '../../interfaces/MotorcycleInterface';

interface MotoDocument extends Motorcycle, Document {}

const motoSchema = new Schema<MotoDocument>(
  {
    category: String,
    engineCapacity: Number,
    model: String,
    year: Number,
    color: String,
    buyValue: Number,
  },
  { versionKey: false },
);

export default class MotoModel extends MongoModel<Motorcycle> {
  constructor(model = createModel('Motorcycle', motoSchema)) {
    super(model);
  }
}
