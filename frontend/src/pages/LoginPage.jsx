import { Button, useDisclosure } from "@nextui-org/react";
import InputComponent from "../components/InputComponent";
import { useEffect, useState } from "react";
import InputPasswordComponent from "../components/InputPasswordComponent";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ModalPopup from "../components/ModalPopUp";
import { authenticate, getSession } from "../services/authorize";
import HealthIcon from "../components/HealthIcon";

export default function LoginPage() {
    const navigate = useNavigate();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [textPopup, setTextPopup] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        getSession("username") && navigate("/");
    }, []);

    const refreshPage = () => {
        navigate("/")
        window.location.reload()
    }

    const login = (e) => {
        e.preventDefault();
        setIsLoading(true);

        axios.post(`${import.meta.env.VITE_API}/login`, { email, password }, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted);
            }
        })
            .then(response => {
                authenticate(response, () => refreshPage());
            }).catch(err => {
                setTextPopup(err.response.data.error);
                onOpen()
            }).finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="w-full max-w-xl flex flex-col justify-center items-center">
            <ModalPopup isOpen={isOpen} onOpenChange={onOpenChange} text={textPopup} buttonText={"Close"} link={null} />
            {isLoading && (
                <ModalPopup isOpen={true} onOpenChange={() => { }} text={"กำลังเข้าสู่ระบบ..."} buttonText={null} link={null} progress={progress} />
            )}
            <form onSubmit={login} className="w-full p-5 m-10 flex flex-col justify-center items-center">
                <div className="flex items-center justify-center mb-10">
                    <HealthIcon size={"4"} props={"mr-2"} color={"green"} />
                    <p className="text-5xl text-green-700 font-bold">HEALTH YOU</p>
                </div>
                <InputComponent type={"email"} value={email} setValue={setEmail} label={"Email"} invalidText={"กรุณากรอกอีเมลล์"} />
                <InputPasswordComponent value={password} setValue={setPassword} label={"Password"} invalidText={"กรุณากรอกรหัสผ่าน"} validate={false} />
                <Button type="submit" className="my-3 px-10" color="success" size="lg">
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