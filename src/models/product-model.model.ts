import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductModel extends Entity {
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
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
    required: true,
  })
  image: string;

  @property({
    type: 'string',
  })
  orderId?: string;

  constructor(data?: Partial<ProductModel>) {
    super(data);
  }
}

export interface ProductModelRelations {
  // describe navigational properties here
}

export type ProductModelWithRelations = ProductModel & ProductModelRelations;
