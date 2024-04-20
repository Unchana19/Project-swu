import { Button, useDisclosure } from "@nextui-org/react";
import InputComponent from "../components/InputComponent";
import { useEffect, useState } from "react";
import InputPasswordComponent from "../components/InputPasswordComponent";
import InputConfirmPasswordComponent from "../components/InputConfirmPasswordComponent";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ModalPopup from "../components/ModalPopUp";
import { getSession } from "../services/authorize";
import HealthIcon from "../components/HealthIcon";

export default function SignUpPage() {
    const navigate = useNavigate();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [textPopup, setTextPopup] = useState("");
    const [link, setLink] = useState();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        getSession("username") && navigate("/");
    }, []);

    const signUp = (e) => {
        e.preventDefault();
        if (email && password && (password === confirmPassword) && email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i) && password.length >= 6) {
            axios.post(`${import.meta.env.VITE_API}/createAccount`, { username, email, password })
                .then(res => {
                    setLink("Login");
                    setTextPopup("สร้างบัญชีสำเร็จ");
                    onOpen()

                    setUsername("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                }).catch(err => {
                    console.log(err.response);
                    if (err.response.data.code === 11000) {
                        setTextPopup("อีเมลล์นี้ถูกใช้งานแล้ว");
                    }
                    setLink(null);
                    setTextPopup(err.response.data.error);
                    onOpen()
                });
        }
    }

    return (
        <div className="w-full max-w-xl flex flex-col justify-center items-center">
            <ModalPopup isOpen={isOpen} onOpenChange={onOpenChange} text={textPopup} buttonText={"Close"} link={link} />
            <form onSubmit={signUp} className="w-full p-5 m-10 flex flex-col justify-center items-center">
                <div className="flex items-center justify-center mb-10">
                    <HealthIcon size={"4"} props={"mr-2"} color={"green"} />
                    <p className="text-5xl text-green-700 font-bold">HEALTH YOU</p>
                </div>
                <InputComponent type={"text"} value={username} setValue={setUsername} label={"Username"} invalidText={"กรุณากรอกชื่อผู้ใช้งาน"} />
                <InputComponent type={"email"} value={email} setValue={setEmail} label={"Email"} invalidText={"กรุณากรอกอีเมลล์"} />
                <InputPasswordComponent value={password} setValue={setPassword} label={"Password"} invalidText={"กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัว"} />
                <InputConfirmPasswordComponent value={confirmPassword} setValue={setConfirmPassword} label={"Confirm Password"} invalidText={"กรุณายืนยันรหัสผ่าน"} password={password} />
                <Button type="submit" className="my-3" color="success" size="lg">
                    <p className="text-xl px-5">Sign up</p>
                </Button>
                <div className="mt-5 flex justify-center items-center">
                    <p className="text-sm p">มีบัญชีอยู่แล้วไช่หรือไม่?</p>
                    <Link to={"/Login"} className="text-sm text-green-600 p-5">เข้าสู่ระบบ</Link>
                </div>
            </form>
        </div>
    )
}