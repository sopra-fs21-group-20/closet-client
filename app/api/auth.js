import client from "./client";

const login = (email, password) => client.post("/login", { username, password });

export default {
  login,
};
