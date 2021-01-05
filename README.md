# Introduction #

A simple Product Catalog service using aws-lambda functions and infrastructure with CDK.

### Deploying
Service is deployed with CDK https://docs.aws.amazon.com/cdk/index.html

```
npm run build && npm run cdk
```

### Running tests
From project root run `npm run build && npm run test` you should be greated with something similar to below:

```
 PASS  test/product-catalog-service.test.ts (6.725 s)
  ✓ Test Infrastructure resources (178 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        7.633 s
Ran all test suites.
```

## Endpoints:
```
    POST - /products
```

Run example on your terminal.
```
curl --location --request POST 'https://b73o41fzxb.execute-api.eu-west-1.amazonaws.com/prod/products' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Porsche cayenne",
    "sku": "PC-4999-33"
}'
```


#### Todo
- Regression test for lambda-layer
- More infrastructure tests