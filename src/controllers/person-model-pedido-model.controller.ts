import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  PersonModel,
  PedidoModel,
} from '../models';
import {PersonModelRepository} from '../repositories';

export class PersonModelPedidoModelController {
  constructor(
    @repository(PersonModelRepository) protected personModelRepository: PersonModelRepository,
  ) { }

  @get('/person-models/{id}/pedido-models', {
    responses: {
      '200': {
        description: 'Array of PersonModel has many PedidoModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PedidoModel)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PedidoModel>,
  ): Promise<PedidoModel[]> {
    return this.personModelRepository.pedidos(id).find(filter);
  }

  @post('/person-models/{id}/pedido-models', {
    responses: {
      '200': {
        description: 'PersonModel model instance',
        content: {'application/json': {schema: getModelSchemaRef(PedidoModel)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PersonModel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoModel, {
            title: 'NewPedidoModelInPersonModel',
            exclude: ['id'],
            optional: ['personId']
          }),
        },
      },
    }) pedidoModel: Omit<PedidoModel, 'id'>,
  ): Promise<PedidoModel> {
    return this.personModelRepository.pedidos(id).create(pedidoModel);
  }

  @patch('/person-models/{id}/pedido-models', {
    responses: {
      '200': {
        description: 'PersonModel.PedidoModel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoModel, {partial: true}),
        },
      },
    })
    pedidoModel: Partial<PedidoModel>,
    @param.query.object('where', getWhereSchemaFor(PedidoModel)) where?: Where<PedidoModel>,
  ): Promise<Count> {
    return this.personModelRepository.pedidos(id).patch(pedidoModel, where);
  }

  @del('/person-models/{id}/pedido-models', {
    responses: {
      '200': {
        description: 'PersonModel.PedidoModel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PedidoModel)) where?: Where<PedidoModel>,
  ): Promise<Count> {
    return this.personModelRepository.pedidos(id).delete(where);
  }
}
