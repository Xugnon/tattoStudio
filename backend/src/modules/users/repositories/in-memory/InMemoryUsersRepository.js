const { hash } = require("bcryptjs");
const { v4 } = require("uuid");

class InMemoryUsersRepository {
  constructor() {
    this.users = [];
  }

  async create({ name, email, password, address, pessoal_number }) {
    const hashPassword = hash(password, 5);

    const newUser = {
      id: v4(),
      name,
      email,
      password: hashPassword,
      address,
      pessoal_number,
      isAdmin: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      Services: [],
      Schedules: [],
    };

    this.users.push(newUser);

    return newUser;
  }

  async finByEmailOrNumber({ email, pessoal_number }) {
    const user = this.users.find(
      (user) => user.email === email || user.pessoal_number === pessoal_number
    );

    return user;
  }

  async findById({ id_user }) {
    const user = this.users.find((user) => user.id === id_user);

    return user;
  }

  async findByEmail({ email }) {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
}

module.exports = InMemoryUsersRepository;
