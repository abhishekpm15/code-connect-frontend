import { useContext, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Signup from "../auth/Signup";
import { Modal } from "antd";
import Login from "@/auth/Login";
import { useNavigate } from "react-router-dom";
import LearnMorePage from "./LearnMorePage";
import Background2 from "@/components/Background2";
import ExplorePage from "./ExplorePage";

const LandingPage = () => {
  const navigate = useNavigate();
  const [loginClick, setLoginClick] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gsapParentRef = useRef();
  const gsapParentRef2 = useRef();


  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    if (data) {
      navigate("/home");
    }
  }, []);

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
      <Background2>
        <section className="h-screen w-screen relative first-section ">
          <Navbar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          <Header isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </section>
        <section className="h-screen w-screen relative overflow-hidden" id="second-section" ref={gsapParentRef}>
          <LearnMorePage parent={gsapParentRef}/>
        </section>
        <section className="h-screen w-screen overflow-hidden" ref={gsapParentRef2}>
          <ExplorePage parent={gsapParentRef2} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </section>
      </Background2>
    </div>
  );
};

export default LandingPage;
