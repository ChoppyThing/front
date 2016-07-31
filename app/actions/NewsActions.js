var AppDispatcher = require('../dispatcher/AppDispatcher');
var NewsConstants = require('../constants/NewsConstants');
require('whatwg-fetch');

var NewsActions = {
  // When data is loaded for the first time
  loaded : function(data) {
    AppDispatcher.dispatch({
      actionType: NewsConstants.NEWS_LOAD,
      data: data
    });
  },

  // Page change
  pageChange: function(page) {
    AppDispatcher.dispatch({
      actionType: NewsConstants.PAGE_CHANGE,
      page: page
    });
  }
};

module.exports = NewsActions;