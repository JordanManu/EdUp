import React, { useState } from "react";

let urlSessions;
if (process.env.REACT_APP_HEROKU_TEST_URL) {
  urlSessions = `${process.env.REACT_APP_HEROKU_TEST_URL}/backend/sessions`;
} else {
  urlSessions = "http://localhost:9000/backend/sessions";
}

let urlUsers;
if (process.env.REACT_APP_HEROKU_TEST_URL) {
  urlUsers = `${process.env.REACT_APP_HEROKU_TEST_URL}/backend/users`;
} else {
  urlUsers = "http://localhost:9000/backend/users";
}

export default function Login() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);

  const login = () => {
    fetch(urlSessions, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }),
    }).then((res) => console.log(res));
  };

  const getUser = () => {
    fetch(urlUsers, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => setData(data));
  };

  return (
    <div>
      <div className="container">
        <h1>Login</h1>
        <div className="input-field col s12">
          <h4>Username</h4>

          <input
            placeholder="username"
            onChange={(e) => setLoginUsername(e.target.value)}
          ></input>
          <h4>Password</h4>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setLoginPassword(e.target.value)}
          ></input>
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            onClick={login}
          >
            Submit
            <i className="material-icons right">send</i>
          </button>
        </div>
        <div>
          <h1>Get User</h1>
          <button onClick={getUser}>Submit</button>
          {data ? <h1>Welcome Back {data.username}</h1> : null}
        </div>
      </div>
    </div>
  );
}
