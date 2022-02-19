import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PedidoModel} from '../models';
import {PedidoModelRepository} from '../repositories';

export class PedidoControllerController {
  constructor(
    @repository(PedidoModelRepository)
    public pedidoModelRepository : PedidoModelRepository,
  ) {}

  @post('/pedidos')
  @response(200, {
    description: 'PedidoModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(PedidoModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoModel, {
            title: 'NewPedidoModel',
            exclude: ['id'],
          }),
        },
      },
    })
    pedidoModel: Omit<PedidoModel, 'id'>,
  ): Promise<PedidoModel> {
    return this.pedidoModelRepository.create(pedidoModel);
  }

  @get('/pedidos/count')
  @response(200, {
    description: 'PedidoModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PedidoModel) where?: Where<PedidoModel>,
  ): Promise<Count> {
    return this.pedidoModelRepository.count(where);
  }

  @get('/pedidos')
  @response(200, {
    description: 'Array of PedidoModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PedidoModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PedidoModel) filter?: Filter<PedidoModel>,
  ): Promise<PedidoModel[]> {
    return this.pedidoModelRepository.find(filter);
  }

  @patch('/pedidos')
  @response(200, {
    description: 'PedidoModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoModel, {partial: true}),
        },
      },
    })
    pedidoModel: PedidoModel,
    @param.where(PedidoModel) where?: Where<PedidoModel>,
  ): Promise<Count> {
    return this.pedidoModelRepository.updateAll(pedidoModel, where);
  }

  @get('/pedidos/{id}')
  @response(200, {
    description: 'PedidoModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PedidoModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PedidoModel, {exclude: 'where'}) filter?: FilterExcludingWhere<PedidoModel>
  ): Promise<PedidoModel> {
    return this.pedidoModelRepository.findById(id, filter);
  }

  @patch('/pedidos/{id}')
  @response(204, {
    description: 'PedidoModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoModel, {partial: true}),
        },
      },
    })
    pedidoModel: PedidoModel,
  ): Promise<void> {
    await this.pedidoModelRepository.updateById(id, pedidoModel);
  }

  @put('/pedidos/{id}')
  @response(204, {
    description: 'PedidoModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pedidoModel: PedidoModel,
  ): Promise<void> {
    await this.pedidoModelRepository.replaceById(id, pedidoModel);
  }

  @del('/pedidos/{id}')
  @response(204, {
    description: 'PedidoModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pedidoModelRepository.deleteById(id);
  }
}
