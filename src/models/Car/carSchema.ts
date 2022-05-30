import { Document, Schema, model as createModel } from 'mongoose';
import { Car } from '../../interfaces/CarInterface';
import MongoModel from '../MongoModel/mongoModel';

interface CarDocument extends Car, Document {}

const carSchema = new Schema<CarDocument>({
  doorsQty: Number,
  seatsQty: Number,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
}, { versionKey: false });

export default class CarModel extends MongoModel<Car> {
  constructor(model = createModel('Cars', carSchema)) {
    super(model);
  }
}
