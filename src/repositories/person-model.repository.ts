import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PersonModel, PersonModelRelations, PedidoModel} from '../models';
import {PedidoModelRepository} from './pedido-model.repository';

export class PersonModelRepository extends DefaultCrudRepository<
  PersonModel,
  typeof PersonModel.prototype.id,
  PersonModelRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<PedidoModel, typeof PersonModel.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PedidoModelRepository') protected pedidoModelRepositoryGetter: Getter<PedidoModelRepository>,
  ) {
    super(PersonModel, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoModelRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
