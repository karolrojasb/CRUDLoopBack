import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProductModel, ProductModelRelations} from '../models';

export class ProductModelRepository extends DefaultCrudRepository<
  ProductModel,
  typeof ProductModel.prototype.id,
  ProductModelRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ProductModel, dataSource);
  }
}
