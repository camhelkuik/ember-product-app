import Ember from 'ember';

export default Ember.Route.extend({

    model() {
    return Ember.RSVP.hash({
      products: this.store.findAll('product'),
      categories: this.store.findAll('category')
    });
  },

  setupController(controller, hash) {
    const model = hash.products;
    const categories = hash.categories;

    this._super(controller, model);

    controller.set('newProduct', this.store.createRecord('product'));
    controller.set('categories', categories);
  },

    actions: {
        addNewProduct(name, sku, unitPrice){
            this.store.createRecord('product', {name, sku, unitPrice}).save().then(
                product => {
          console.info('Response:', product); // eslint-disable-line no-console
          this.controller.set('newProductName', '');
          this.controller.set('newProductSku', '');
          this.controller.set('newProductPrice', '');
        },
        error => {
          console.error('Error from server:', error); // eslint-disable-line no-console
            });
        },
        editProduct(product) {
            product.set('isEditing', true);
        },
        cancelProductUpdate(product){
            product.set('isEditing', false);
            product.rollbackAttributes();
        },
        updateProduct(product){
            product.save().then(
                product => product.set('isEditing', false)
            );
        },
        deleteProduct(product){
            product.destroyRecord();
        }
    }
});
