import users from "../controllers/users";

const Routes = app => {

  app.post("/", users().postUser);
  app.get("/:username", users().getUser);
  app.put("/:username", users().putUser);
  app.delete("/:username", users().deleteUser);

};

export default Routes;
