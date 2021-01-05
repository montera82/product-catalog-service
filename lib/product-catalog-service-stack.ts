import * as cdk from '@aws-cdk/core';
import { LambdaIntegration, RestApi, IResource, MockIntegration, PassthroughBehavior } from '@aws-cdk/aws-apigateway';
import { AttributeType, Table } from '@aws-cdk/aws-dynamodb';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
const lambdaDir = './dist/src';

export class ProductCatalogServiceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Resources
    const dynamoProductsTable = new Table(this, "ProductsTable", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      tableName: "ProductsTable",
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });

    // Lambdas
    const createProductLambda = new Function(this, "createProductFunction", {
      code: Code.fromAsset(`${lambdaDir}/main`),
      handler: "handler.create",
      runtime: Runtime.NODEJS_12_X,
      environment: {
        PRODUCTS_TABLE_NAME: dynamoProductsTable.tableName
      }
    });

    // Give IAM permissions to fuctions 
    dynamoProductsTable.grantWriteData(createProductLambda);

    // APIGateway 
    const api = new RestApi(this, "product-catalog-service", {
      restApiName: "Product Catalog Service"
    });

    const products = api.root.addResource("products");
    const createProductIntegration = new LambdaIntegration(createProductLambda);
    products.addMethod('POST', createProductIntegration);

  }
}


export function addCorsOptions(apiResource: IResource) {
  apiResource.addMethod(
    "OPTIONS",
    new MockIntegration({
      integrationResponses: [
        {
          statusCode: "200",
          responseParameters: {
            "method.response.header.Access-Control-Allow-Headers":
              "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
            "method.response.header.Access-Control-Allow-Origin": "'*'",
            "method.response.header.Access-Control-Allow-Credentials":
              "'false'",
            "method.response.header.Access-Control-Allow-Methods":
              "'OPTIONS,GET,PUT,POST,DELETE'",
          },
        },
      ],
      passthroughBehavior: PassthroughBehavior.NEVER,
      requestTemplates: {
        "application/json": '{"statusCode": 200}',
      },
    }),
    {
      methodResponses: [
        {
          statusCode: "200",
          responseParameters: {
            "method.response.header.Access-Control-Allow-Headers": true,
            "method.response.header.Access-Control-Allow-Methods": true,
            "method.response.header.Access-Control-Allow-Credentials": true,
            "method.response.header.Access-Control-Allow-Origin": true,
          },
        },
      ],
    }
  );
}