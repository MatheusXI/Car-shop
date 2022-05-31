import { Model as M, Document } from "mongoose";
import { Model } from "../../interfaces/ModelInterface";

export default abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) {}

  create = async (obj: T): Promise<T> => this.model.create(obj);

  read = async (): Promise<T[]> => this.model.find({});

  readOne = async (str: string): Promise<T | null> =>
    this.model.findOne({ _id: str });

  update = async (str: string, obj: T): Promise<T | null> => {
    await this.model.updateOne({ _id: str }, { ...obj });
    return this.model.findOne({ _id: str });
  };

  delete = async (str: string): Promise<T | null> => {
    await this.model.deleteOne({ _id: str });
    return this.model.findOne({ _id: str });
  };
}
