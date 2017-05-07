import Ember from 'ember';

export default Ember.Route.extend({

    model(){
        return this.store.findAll('product');
    },

    actions: {
        addNewProduct(name, sku, unitPrice){
            this.store.createRecord('product', {name, sku, unitPrice}).save().then(
                product => {
          console.info('Response:', product);
          this.controller.set('newProductName', '');
          this.controller.set('newProductSku', '');
          this.controller.set('newProductPrice', '');
        },
        error => {
          console.error('Error from server:', error);
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
