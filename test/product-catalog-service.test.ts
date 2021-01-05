import { expect as expectCDK, matchTemplate, MatchStyle, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as PStack from '../lib/product-catalog-service-stack';

test('Test Infrastructure resources', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new PStack.ProductCatalogServiceStack(app, 'ProductCatalogServiceStack');
    // THEN
    expectCDK(stack).to(haveResource('AWS::DynamoDB::Table', {
      TableName: 'ProductsTable'
    }));
});
