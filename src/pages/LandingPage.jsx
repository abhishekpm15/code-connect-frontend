import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Signup from "../auth/Signup";
import { Modal } from "antd";
import Login from "@/auth/Login";
import { UserContext } from "@/context/UserProvider";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const { email } = useContext(UserContext);
  console.log('email',email)
  const [loginClick, setLoginClick] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    const userData = JSON.parse(userInfo)?.data
    if (userData) {
      navigate("/home");
    }
  });

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {loginClick ? (
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Login loginClick={loginClick} setLoginClick={setLoginClick} />
        </Modal>
      ) : (
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Signup loginClick={loginClick} setLoginClick={setLoginClick} />
        </Modal>
      )}
      <Navbar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Header />
    </div>
  );
};

export default LandingPage;
