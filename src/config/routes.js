import Users from "../controllers/users";

const Routes = () => {

  const users = Users();

  const routes = app => {
    app.post("/", users.postUser);
    app.get("/:username", users.getUser);
    app.put("/:username", users.putUser);
    app.delete("/:username", users.deleteUser);
  };

  return { routes };

};

export default Routes;
