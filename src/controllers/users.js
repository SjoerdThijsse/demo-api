import User from "../models/User";

const users = () => {

  // curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X GET http://127.0.0.1:5001/{username}
  const getUser = (req, res) => {
    const username = req.params.username;
    User.findOne({ username }).exec()
      .then(user => {
        if (!user) return res.send(`Found no user with username: '${username}'.`);
        return res.json(user);
      })
      .catch(err => res.json(err));
  };

  // curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X POST -d @demo-api-user1.json http://127.0.0.1:5001/
  const postUser = (req, res) => {
    const { first_name, last_name, email, username, password } = req.body;
    new User({ first_name, last_name, email, username, password }).save()
      .then(user => res.send(`Created user with username: '${username}'.`))
      .catch(err => res.status(500).json(err));
  };

  // curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X PUT -d @demo-api-user2.json http://127.0.0.1:5001/{username}
  const putUser = (req, res) => {
    const usernameToUpdate = req.params.username;
    const { first_name, last_name, email, username, password } = req.body;

    User.update({
      username: usernameToUpdate
    }, {
      first_name, last_name, email, username, password
    }).exec()
      .then(user => res.send(`Updated user with username: '${usernameToUpdate}'.`))
      .catch(err => res.status(500).json(err));
  };

  // curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X DELETE http://127.0.0.1:5001/{username}
  const deleteUser = (req, res) => {
    const username = req.params.username;
    User.remove({ username }).exec()
      .then(user => res.send(`Removed user with username: '${username}'.`))
      .catch(err => res.status(500).json(err));
  };

  return {
    getUser: getUser,
    postUser: postUser,
    putUser: putUser,
    deleteUser: deleteUser
  };

};

export default users;
