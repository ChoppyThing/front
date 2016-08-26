const Config = require('./Config');

let routes = {
	news_page: '/news/get/',
	news_get_by_id: '/news/getone/',

	comment_add: '/comment/add',
	comments_get: '/comment/getComments/',

	book_get_categories: '/book/getBookCategories/',
	book_get_by_category: '/book/getAllByCategory/'
};

module.exports = {
  getPath: function(path, parameters) {
  	let params = this.generateParams(parameters);
  	return Config.api_host + routes[path] + params;
  },

  generateParams: function(parameters) {
  	let params = '';

  	if (undefined != parameters) {
	  	if(Object.keys(parameters).length > 0) {
	  		params += '?';

		  	Object.keys(parameters).forEach(function(key) {
		  		params += key + '=' + parameters[key];
				});
	  	}
  	}

		return params;
  }

};