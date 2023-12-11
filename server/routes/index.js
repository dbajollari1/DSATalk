import discussionRoutes from './discussions.js';
import userRoutes from './user_routes.js'
import questionRoutes from './questions.js'


const constructorMethod = (app) => {
  app.use('/discussions', discussionRoutes);
  app.use('/questions', questionRoutes);
  app.use('/users', userRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;