import { Button } from "@nextui-org/react";
import InputComponent from "../components/InputComponent";
import { useState } from "react";
import InputPasswordComponent from "../components/InputPasswordComponent";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return (
        <div className="w-full max-w-xl flex flex-col justify-center items-center">
            <form className="w-full p-5 m-10 flex flex-col justify-center items-center">
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