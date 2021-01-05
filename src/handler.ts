import { Handler } from '@aws-cdk/aws-lambda';
import { Context } from 'aws-lambda';
import { CreateProduct } from './lambda-fn/createProduct';
import { CreateProductService } from './service/CreateProductService';

const createProductService = new CreateProductService();
const createProduct = new CreateProduct(createProductService);

export const create: Handler = (event: any, context: Context): Promise<any> => {
    return createProduct.create(event, context);
}