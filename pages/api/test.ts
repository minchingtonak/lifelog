import { createUser } from "@db/user";
import r from "@helpers/router.helper";
import { UserModel } from "@models/user";

const router = r();

router.get(async (req, res) => {
  const {
    query: { username, password },
  } = req;

  if (typeof username === "string" && typeof password === "string") {
    console.log(username, password);

    const user = await createUser(username, password);

    return res.status(200).json(user);
  } else if (typeof username === "string") {
    return res.status(200).json(await UserModel.findOne({ username }));
  }

  return res.status(500).end();
});

export default router;
