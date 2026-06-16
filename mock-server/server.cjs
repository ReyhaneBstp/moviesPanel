const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); 
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);


server.post('/api/movies/bulk/delete', (req, res) => {
  const { ids } = req.body;
  const db = router.db; 

  if (Array.isArray(ids)) {
    ids.forEach(id => {
      db.get('movies').remove({ id }).write();
    });
    res.status(200).json({ message: 'آیتم‌ها با موفقیت حذف شدند' });
  } else {
    res.status(400).json({ error: 'آرایه ids نامعتبر است' });
  }
});


server.patch('/api/movies/bulk/activate', (req, res) => {
  const { ids } = req.body;
  const db = router.db;

  if (Array.isArray(ids)) {
    ids.forEach(id => {
      db.get('movies').find({ id }).assign({ isActive: true }).write();
    });
    res.status(200).json({ message: 'آیتم‌ها با موفقیت فعال شدند' });
  } else {
    res.status(400).json({ error: 'آرایه ids نامعتبر است' });
  }
});

server.patch('/api/movies/bulk/deactivate', (req, res) => {
  const { ids } = req.body;
  const db = router.db;

  if (Array.isArray(ids)) {
    ids.forEach(id => {
      db.get('movies').find({ id }).assign({ isActive: false }).write();
    });
    res.status(200).json({ message: 'آیتم‌ها با موفقیت غیرفعال شدند' });
  } else {
    res.status(400).json({ error: 'آرایه ids نامعتبر است' });
  }
});

server.use('/api', router);

server.listen(4000, () => {
  console.log('JSON Server is running with custom bulk routes on port 3000');
});
