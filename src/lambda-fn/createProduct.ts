import { CreateProductInterface } from '../service/createProductService';
import { v4 as uuid } from 'uuid';
import { MessageUtil } from '../lib/MessageUtil';

export class CreateProduct {

  constructor(private service: CreateProductInterface) { }

  async create(event: any, context?: any) {
    const { name, sku } = JSON.parse(event.body);
    const now = new Date();

    const params = {
      id: uuid(),
      name,
      sku,
      createdAt: now.toISOString()
    }

    try {
      const result = await this.service.create(params);
      return MessageUtil.success(201, result);

    } catch (err) {
      console.log(err)
      return MessageUtil.error(err.code, err.message);
    }
  }

}