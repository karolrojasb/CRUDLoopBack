import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PedidoModel, PedidoModelRelations, PersonModel, ProductModel} from '../models';
import {PersonModelRepository} from './person-model.repository';
import {ProductModelRepository} from './product-model.repository';

export class PedidoModelRepository extends DefaultCrudRepository<
  PedidoModel,
  typeof PedidoModel.prototype.id,
  PedidoModelRelations
> {

  public readonly person: BelongsToAccessor<PersonModel, typeof PedidoModel.prototype.id>;

  public readonly product: HasOneRepositoryFactory<ProductModel, typeof PedidoModel.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonModelRepository') protected personModelRepositoryGetter: Getter<PersonModelRepository>, @repository.getter('ProductModelRepository') protected productModelRepositoryGetter: Getter<ProductModelRepository>,
  ) {
    super(PedidoModel, dataSource);
    this.product = this.createHasOneRepositoryFactoryFor('product', productModelRepositoryGetter);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
    this.person = this.createBelongsToAccessorFor('person', personModelRepositoryGetter,);
    this.registerInclusionResolver('person', this.person.inclusionResolver);
  }
}
