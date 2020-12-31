import { Handler, Context } from 'aws-lambda';
import { CreateProduct } from './controller/createProduct';
import { CreateProductService } from './service/createProductService';


const createProductService = new CreateProductService();
const createProduct = new CreateProduct(createProductService);

export const create : Handler = (event: any, context : Context) => {
    return createProduct.create(event, context);
}