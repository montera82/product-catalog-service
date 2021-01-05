#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ProductCatalogServiceStack } from '../lib/product-catalog-service-stack';

const app = new cdk.App();
new ProductCatalogServiceStack(app, 'ProductCatalogServiceStack');
