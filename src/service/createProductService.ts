
import AWS from 'aws-sdk';
import createError from 'http-errors'

const dynamodb = new AWS.DynamoDB.DocumentClient();

export interface CreateProductInterface {
      create(params: any ): Promise<object> ;
}

export class CreateProductService implements CreateProductInterface{
    async create ( params: Product) : Promise<object> {
        
        try {
            await dynamodb.put({
              TableName : process.env.PRODUCTS_TABLE_NAME, 
              Item: params
            }).promise();
          } catch (err) {
            console.log(err)
            throw new createError.InternalServerError(err);
          }
        return params
    }
}