"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Modal from "./Modal";
import Register from "./auth/Register";
import Login from "./auth/Login";
import useAuthStore from "@/store/authStore";
import Navbar from "./Navbar";

const LoginModal = () => {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const user = useAuthStore((state) => state.user);
  const searchParams = useSearchParams();
  const router = useRouter();
  const isLoginModalOpen = searchParams.get("loginModal") === "login";

  return (
    <>
      <button onClick={() => router.push("?loginModal=login")}>
        {user ? <span>{user.email}</span> : <span>Login here</span>}
      </button>
      <Modal isOpen={isLoginModalOpen} onClose={() => router.push("/")}>
        <Login />
      </Modal>
    </>
  );
};

const RegisterModal = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isRegisterModalOpen = searchParams.get("registerModal") === "register";

  return (
    <Modal isOpen={isRegisterModalOpen} onClose={() => router.push("/")}>
      <Register />
    </Modal>
  );
};

const ClientHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex items-center">
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
      <Suspense fallback={null}>
        <LoginModal />
        <RegisterModal />
      </Suspense>
      {isSidebarOpen && <Navbar />}
    </div>
  );
};

export default ClientHeader;
