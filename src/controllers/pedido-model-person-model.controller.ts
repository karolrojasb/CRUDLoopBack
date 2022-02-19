import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PedidoModel,
  PersonModel,
} from '../models';
import {PedidoModelRepository} from '../repositories';

export class PedidoModelPersonModelController {
  constructor(
    @repository(PedidoModelRepository)
    public pedidoModelRepository: PedidoModelRepository,
  ) { }

  @get('/pedido-models/{id}/person-model', {
    responses: {
      '200': {
        description: 'PersonModel belonging to PedidoModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PersonModel)},
          },
        },
      },
    },
  })
  async getPersonModel(
    @param.path.string('id') id: typeof PedidoModel.prototype.id,
  ): Promise<PersonModel> {
    return this.pedidoModelRepository.person(id);
  }
}
