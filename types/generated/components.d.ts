import type { Schema, Attribute } from '@strapi/strapi';

export interface AddressAdress extends Schema.Component {
  collectionName: 'components_address_adresses';
  info: {
    displayName: 'Adress';
    icon: 'house';
    description: '';
  };
  attributes: {
    street: Attribute.String;
    street_2: Attribute.String;
    state: Attribute.String;
    country: Attribute.String;
    zip: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'address.adress': AddressAdress;
    }
  }
}
