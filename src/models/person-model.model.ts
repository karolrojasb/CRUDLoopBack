import {Entity, model, property, hasMany} from '@loopback/repository';
import {PedidoModel} from './pedido-model.model';

@model()
export class PersonModel extends Entity {
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
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  contact: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasMany(() => PedidoModel, {keyTo: 'personId'})
  pedidos: PedidoModel[];

  constructor(data?: Partial<PersonModel>) {
    super(data);
  }
}

export interface PersonModelRelations {
  // describe navigational properties here
}

export type PersonModelWithRelations = PersonModel & PersonModelRelations;
