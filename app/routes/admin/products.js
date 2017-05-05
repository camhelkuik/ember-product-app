import Ember from 'ember';

export default Ember.Route.extend({

    model(){
        return this.store.findAll('product');
    },

    actions: {
        addNewProduct(name){
            this.store.createRecord('product', {name}).save().then(
                product => {
          console.info('Response:', product);
          this.controller.set('newProductName', '');
        },
        error => {
          console.error('Error from server:', error);
            });
        },
        editProduct(product) {
            product.set('isEditing', true);
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
