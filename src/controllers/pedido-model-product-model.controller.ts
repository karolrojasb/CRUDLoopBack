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
  PedidoModel,
  ProductModel,
} from '../models';
import {PedidoModelRepository} from '../repositories';

export class PedidoModelProductModelController {
  constructor(
    @repository(PedidoModelRepository) protected pedidoModelRepository: PedidoModelRepository,
  ) { }

  @get('/pedido-models/{id}/product-model', {
    responses: {
      '200': {
        description: 'PedidoModel has one ProductModel',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ProductModel),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProductModel>,
  ): Promise<ProductModel> {
    return this.pedidoModelRepository.product(id).get(filter);
  }

  @post('/pedido-models/{id}/product-model', {
    responses: {
      '200': {
        description: 'PedidoModel model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductModel)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PedidoModel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductModel, {
            title: 'NewProductModelInPedidoModel',
            exclude: ['id'],
            optional: ['orderId']
          }),
        },
      },
    }) productModel: Omit<ProductModel, 'id'>,
  ): Promise<ProductModel> {
    return this.pedidoModelRepository.product(id).create(productModel);
  }

  @patch('/pedido-models/{id}/product-model', {
    responses: {
      '200': {
        description: 'PedidoModel.ProductModel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductModel, {partial: true}),
        },
      },
    })
    productModel: Partial<ProductModel>,
    @param.query.object('where', getWhereSchemaFor(ProductModel)) where?: Where<ProductModel>,
  ): Promise<Count> {
    return this.pedidoModelRepository.product(id).patch(productModel, where);
  }

  @del('/pedido-models/{id}/product-model', {
    responses: {
      '200': {
        description: 'PedidoModel.ProductModel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductModel)) where?: Where<ProductModel>,
  ): Promise<Count> {
    return this.pedidoModelRepository.product(id).delete(where);
  }
}
