var restify = require('restify');
var server = restify.createServer();

server.use(restify.plugins.bodyParser({ mapParams: true }))

const Storage = require('dom-storage');
const localStorage = new Storage('./db.json', { strict: false, ws: '  ' });

const now = new Date();

const users = [
  { name: 'thiago1', email: 'hagy', db_id: '1', id: '1', created_at: now, updated_at: now },
  { name: 'thiago2', email: 'hagy2', db_id: '2', id: '2', created_at: now, updated_at: now },
  { name: 'thiago3', email: 'hagy3', db_id: '3', id: '3', created_at: now, updated_at: now },
  { name: 'thiago4', email: 'hagy4', db_id: '4', id: '4', created_at: now, updated_at: now },
];

localStorage.setItem('users', users);

server.get('/pull', (req, res, next) => {
  console.log('PULL CALL')

  const users = localStorage.getItem('users');
  console.log(users);

  const response = {
    changes: {
      users: {

        // {
        //   "name": "thiago4edit",
        //   "email": "hagy4edit",
        //   "id": "4",
        //   "db_id": "4",
        //   "created_at": "2020-04-29T13:51:14.612Z",
        //   "updated_at": "2020-04-29T15:51:14.612Z"
        // }
        
        created: [],
        // created: users,
        updated: [],
        // deleted: [],
        deleted: ['2'],
      }
    },
    timestamp: new Date().getTime()/1000,
  }


  res.send(200, response )
  next();
});


server.post('/push', (req, res, next) => {
  console.log('PUSH CALL')
  const users = localStorage.getItem('users');
  const changes = req.body.changes;

  for (let ic = 0; ic < changes.users.created.length; ic++) {
    const userToCreate = changes.users.created[ic];
    const now = new Date();

    users.push({
      name: userToCreate.name,
      email: userToCreate.email,
      db_id: Date(),
      created_at: now,
      updated_at: now,
      id: userToCreate.id,
    })
  }

  for (let ic = 0; ic < changes.users.updated.length; ic++) {
    const userToUpdate = changes.users.updated[ic];
    const now = new Date();

    
    for (let iUserDb = 0; iUserDb < users.length; iUserDb++) {
      const userDb = users[iUserDb];

      if (userToUpdate._id == userDb.id) {
        userDb = { ...userToUpdate };
      }
    }
  }

  const iToRemove = [];
  for (let ic = 0; ic < changes.users.deleted.length; ic++) {
    const userToDelete = changes.users.deleted[ic];
        
    for (let iUserDb = 0; iUserDb < users.length; iUserDb++) {
      const userDb = users[iUserDb];

      if (userToDelete._id == userDb.id) {
        iToRemove.push(ic);
      }
    }
  }

  for (const iRemove in iToRemove) {
    users.splice(iRemove, 1);
  }

  localStorage.setItem('users', users);

  next();
});


server.listen(80, function() {
  console.log('%s listening at %s', server.name, server.url);
});