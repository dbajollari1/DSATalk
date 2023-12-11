import discussionRoutes from './discussions.js';
import userRoutes from './user_routes.js'
import questionRoutes from './questions.js'
import commentRoutes from './comments.js';


const constructorMethod = (app) => {
  app.use('/discussions', discussionRoutes);
  app.use('/comments', commentRoutes);
  app.use('/questions', questionRoutes);
  app.use('/users', userRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;