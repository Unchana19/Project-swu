import { Button, useDisclosure } from "@nextui-org/react";
import InputComponent from "../components/InputComponent";
import { useState } from "react";
import InputPasswordComponent from "../components/InputPasswordComponent";
import { Link } from "react-router-dom";
import axios from "axios";
import ModalPopup from "../components/ModalPopUp";

export default function LoginPage() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [textPopup, setTextPopup] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_API}/login`, {email, password})
            .then(res => {
                setTextPopup("เข้าสู่ระบบสำเร็จ");
                onOpen()

                setEmail("");
                setPassword("");
            }).catch(err => {
                setTextPopup(err.response.data.error);
                onOpen()
            });
    }

    return (
        <div className="w-full max-w-xl flex flex-col justify-center items-center">
            <ModalPopup isOpen={isOpen} onOpenChange={onOpenChange} text={textPopup} buttonText={"Close"} link={null} />
            <form onSubmit={login} className="w-full p-5 m-10 flex flex-col justify-center items-center">
                <p className="text-5xl font-bold mb-10">LOGO</p>
                <InputComponent type={"email"} value={email} setValue={setEmail} label={"Email"} invalidText={"กรุณากรอกอีเมลล์"} />
                <InputPasswordComponent value={password} setValue={setPassword} label={"Password"} invalidText={"กรุณากรอกรหัสผ่าน"} />
                <Button type="submit" className="my-3" color="success" size="lg">
                    <p className="text-xl">Login</p>
                </Button>
                <div className="mt-5 flex justify-center items-center">
                    <p className="text-sm p">ยังไม่มีบัญชีผู้ใช้ใช่ไหม?</p>
                    <Link to={"/Sign-Up"} className="text-sm text-green-600 p-5">สร้างบัญชี</Link>
                </div>
            </form>
        </div>
    )
}