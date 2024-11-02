import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [screenLoad, setScreenLoad] = useState(false);
  const [searchPost, setSearchPost] = useState([]);
  const [searched, setSearched] = useState(false)
  const URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(()=>{
    if(searchValue === ''){
        setSearched(false)
    }
  },[searchValue])

  const handleSubmit = (e) =>{
    if(searchValue === ''){
      toast.error("Search must not be empty !")
      return;
    }
    e.preventDefault()
    setSearched(true)
    console.log("search value change", searchValue);
    const userInfo = localStorage.getItem("userInfo");
    console.log(JSON.parse(userInfo).data.token);
    const token = JSON.parse(userInfo).data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${URL}/post/searchPost/${searchValue}`, {
        headers,
      })
      .then((res) => {
        console.log(res);
        setSearchPost(res.data)
        setScreenLoad(false);
      })
      .catch((err) => {
        console.log("fetch err", err);
        setScreenLoad(false);
      });
  }

  const values = { searchValue, setSearchValue ,handleSubmit, searchPost , setSearchPost, searched, setSearched};
  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
};

export default SearchProvider;
