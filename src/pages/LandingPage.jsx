import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Signup from "../auth/Signup";
import { Modal } from "antd";
import Login from "@/auth/Login";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [loginClick, setLoginClick] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data  = localStorage.getItem('userInfo');
  useEffect(() => {
    if(data){
      window.location.href = '/home';
    }
  })

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
      <Header isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default LandingPage;
