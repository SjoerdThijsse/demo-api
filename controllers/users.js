import User from "../models/User";

const users = () => {

  // curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X GET http://127.0.0.1:5000/{username}
  const getUser = (req, res) => {
    const username = req.params.username;
    User.findOne({
      username: username
    }).exec().then(user => {
      if (user) return res.json(user);
      return res.send(`Found no user with username: '${username}'.`);
    }).catch(err => res.json(err));
  };

  // curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X POST -d @demo-api-user1.json http://127.0.0.1:5000/
  const postUser = (req, res) => {
    const username = req.body.username;
    new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: username,
      password: req.body.password
    }).save().then(user => {
      return res.send(`Created user with username: '${username}'.`);
    }).catch(err => res.status(500).json(err));
  };

  // curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X PUT -d @demo-api-user2.json http://127.0.0.1:5000/{username}
  const putUser = (req, res) => {
    const username = req.params.username;
    User.update({
      username: username
    }, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }).exec().then(user => {
      return res.send(`Updated user with username: '${username}'.`);
    }).catch(err => res.status(500).json(err));
  };

  // curl -i -H "Content-Type: application/json" -H "Accept: application/json" -X DELETE http://127.0.0.1:5000/{username}
  const deleteUser = (req, res) => {
    const username = req.params.username;
    User.remove({
      username: req.params.username
    }).exec().then(user => {
      return res.send(`Removed user with username: '${username}'.`);
    }).catch(err => res.status().json(err));
  };

  return {
    getUser: getUser,
    postUser: postUser,
    putUser: putUser,
    deleteUser: deleteUser
  };

};

export default users;
