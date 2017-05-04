import Ember from 'ember';

export default Ember.Route.extend({

    model(){
        return this.store.findAll('category');
    },

    actions: {
        addNewCategory(name) {
      this.store.createRecord('category', { name }).save().then(
        category => {
          console.info('Response:', category);
          this.controller.set('newCategoryName', '');
        },
        error => {
          console.error('Error from server:', error);
        });
        },

        deleteCategory(category) {
            category.destroyRecord();
        }
    }
});
