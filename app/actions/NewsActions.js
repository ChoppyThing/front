require('whatwg-fetch');
var Router = require('../config/Router');
var NewsConstants = require('../constants/NewsConstants');

var NewsActions = {
  getNews: function(page) {
    if (page == undefined) {
      page = 1;
    }
    return fetch(Router.getPath('news_page', {page: page}));
  },

  load: function() {
    return function (dispatch) {
      return NewsActions.getNews()
      .then(response => response.json())
      .then(json => 
        dispatch(NewsActions.loaded(json))
      )
    }
  },

  pageChange: function(page) {
    return function (dispatch) {
      return NewsActions.getNews(page)
      .then(response => response.json())
      .then(json => 
        dispatch(NewsActions.loaded(json))
      )
    }
  },

  loaded: function(news) {
    return {
      type: NewsConstants.LOADED,
      news: news
    }
  }
};

module.exports = NewsActions;