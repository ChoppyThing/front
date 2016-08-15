require('whatwg-fetch');
var BookActions = require('../actions/BookActions');
const Router = require('../config/Router');


module.exports = {
    getCategories: function() {
        fetch(Router.getPath('book_get_categories'))
        .then(response => {
            return response.json();
        })
        .then(json => {
          BookActions.getAll(json);
        }).catch(error => {
            console.log('Load book category error', error);
        });
    },

    getByCategory: function(category) {
        fetch(Router.getPath('book_get_by_category', {category: category}))
        .then(response => {
            return response.json();
        })
        .then(json => {
          BookActions.getById(json);
        }).catch(error => {
            console.log('Load book error', error);
        });
    }
};