import React                   from 'react';
import { DefaultRoute, Route } from 'react-router';

import App 	from 'app';
import Blog from 'components/blog/blog';
import Note from 'components/note/Note';
import Book from 'components/book/Book';
import Layout from './components/utils/Layout';

export default (
	<DefaultRoute path="/">
	  <Route path="/" component={App}/>
	  <Route component={Layout}>
	    <Route path="/blog" component={Blog}>
	      <Route path="/blog/page/:page" component={Blog}/>
	    </Route>
	    <Route path="/blog/note/:note" component={Note}/>
	  </Route>
	  <Route path="/book" component={Book}>
	    <Route path="/book/:category" component={Book}/>
	  </Route>
  </DefaultRoute>
);