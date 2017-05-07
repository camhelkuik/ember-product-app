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
    
    editCategory(category) {
      category.set('isEditing', true);
    },

    updateCategory(category) {
      category.save().then(
        category => category.set('isEditing', false)
      );
    },
    cancelUpdateCategory(category){
      category.set('isEditing', false);
      category.rollbackAttributes();
    },

        deleteCategory(category) {
            category.destroyRecord();
        }
    }
});
