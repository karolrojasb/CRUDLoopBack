import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {PersonModel} from './person-model.model';
import {ProductModel} from './product-model.model';

@model()
export class PedidoModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  id_producto: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  state: number;

  @belongsTo(() => PersonModel)
  personId: string;

  @hasOne(() => ProductModel, {keyTo: 'orderId'})
  product: ProductModel;

  constructor(data?: Partial<PedidoModel>) {
    super(data);
  }
}

export interface PedidoModelRelations {
  // describe navigational properties here
}

export type PedidoModelWithRelations = PedidoModel & PedidoModelRelations;
