import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
    name: faker.commerce.productName,
    sku: faker.random.number,
    unitPrice: faker.commerce.price
});
