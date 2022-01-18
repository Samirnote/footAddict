require("./../config/mongodb");

const useModel = require("./../model/User");
const bcrypt = require("bcrypt");

const users = [
  {
    name: "foo",
    lastname: "bar",
    password: "123Soleil",
    role: "admin",
    email: "foo@bar.com",
  },
  {
    name: "bim",
    lastname: "yolo",
    password: "123Soleil",
    role: "user",
    email: "truc@bar.com",
  },
  {
    name: "booum",
    lastname: "machin",
    password: "123Soleil",
    role: "admin",
    email: "chose@bar.com",
  },
];

(async function () {
  try {
    await useModel.deleteMany();
    const res = await useModel.create(
      users.map((u) => {
        u.password = bcrypt.hashSync(u.password, 10);
        return u;
      })
    );
    console.log(`Just created ${res.length} 🦆`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit();
  }
})();
