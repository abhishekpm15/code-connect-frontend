import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserContext } from "@/context/UserProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Login = ({ loginClick, setLoginClick }) => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACKEND_URL;
  const {
    email,
    setEmail,
    password,
    setPassword,
    token,
    userData,
    setUserData,
  } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    console.log(email, password);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    if (!password || !email) {
      toast.error("Please fill all the fields");
      setLoad(false);
      return;
    }

    await axios
      .post(`${URL}/user/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          toast.success("Successfully Logged in");
          localStorage.setItem("userInfo", JSON.stringify(res));
        }
        setTimeout(() => {
          setLoad(false);
          navigate("/home");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          toast.error(err.response.data.message);
          setLoad(false);
        }
      });
  };

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  placeholder="Enter Your Email"
                  className="border-2 border-black/20 dark:border-white/40 focus:none"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Password</Label>
                <Input
                  id="password"
                  value={password}
                  placeholder="Enter Your Password"
                  className="border-2 border-black/20 dark:border-white/40 focus:none"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="flex justify-center">
                New user ? &nbsp;
                <span
                  className="font-bold cursor-pointer"
                  onClick={() => {
                    setLoginClick(false);
                  }}
                >
                  Register
                </span>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              {load ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 24,
                      }}
                      spin
                    />
                  }
                />
              ) : (
                <Button className="w-full" onClick={handleSubmit}>
                  Login
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
