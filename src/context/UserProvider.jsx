import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [token , setToken] = useState('')
  const [userData, setUserData] = useState(false)

  const values = {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    confirmPass,
    setConfirmPass,
    userData,
    setUserData
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserProvider;
