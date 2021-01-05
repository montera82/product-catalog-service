# Introduction #

A simple Product Catalog service using aws-lambda functions and infrastructure with CDK.

### Deploying
Service is deployed with CDK https://docs.aws.amazon.com/cdk/index.html

```
npm run build && npm run cdk
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
- Test cdk infrastructure