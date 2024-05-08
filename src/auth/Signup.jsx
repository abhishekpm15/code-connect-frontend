import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "@/context/UserProvider";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Signup = ({ loginClick, setLoginClick }) => {
  const [load, setLoad] = useState(false);
  // const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACKEND_URL;
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPass,
    setConfirmPass,
    token,
  } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    console.log(email, name, password);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    if (!name || !password || !email) {
      toast.error("Please fill all the fields");
      setLoad(false);
      return;
    }
    if (password !== confirmPass) {
      toast.error("Passwords do not match");
      setLoad(false);
      return;
    }
    await axios
      .post(`${URL}/user/register`, {
        email,
        password,
        name,
      })
      .then((res) => {
        console.log('res',res)
        if (res.status === 201) {
          console.log("res", res);
          console.log(res.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res));
        }
        setTimeout(() => {
          setLoad(false);
          toast.success("Successfully registered");
          navigate("/home");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          toast.error(err.response.data.message);
          setLoad(false)
        }
      });
  };

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  placeholder="Enter Your Name"
                  className="border-2 border-black/20 dark:border-white/40 focus:none"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Re-enter Password</Label>
                <Input
                  id="re-password"
                  value={confirmPass}
                  placeholder="Enter Your Password"
                  className="border-2 border-black/20 dark:border-white/40 focus:none"
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                  }}
                />
              </div>
              <div className="flex justify-center">
                Signed in Already ? &nbsp;{" "}
                <span
                  className="font-bold cursor-pointer"
                  onClick={() => {
                    setLoginClick(true);
                  }}
                >
                  Login
                </span>{" "}
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
                  Sign up
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
