import { CreateProductInterface } from '../service/createProductService';
import { v4 as uuid} from 'uuid';

export class CreateProduct {

  constructor ( private service: CreateProductInterface) {}

  async create ( event: any, context?: any) {

    const now = new Date();

    const params = {
      id: uuid(),
      name : "Picadilly",
      sku : "P-001-01",
      createdAt : now.toISOString()
    }

    const result = await this.service.create(params);

    return {
      statusCode: 201,
      body: JSON.stringify(result),
    };
  }

}