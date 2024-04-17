import { Button } from "@nextui-org/react";
import InputComponent from "../components/InputComponent";
import { useState } from "react";
import InputPasswordComponent from "../components/InputPasswordComponent";
import { Link } from "react-router-dom";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    return (
        <div className="w-full max-w-xl flex flex-col justify-center items-center">
            <form className="w-full p-5 m-10 flex flex-col justify-center items-center">
                <p className="text-5xl font-bold mb-10">LOGO</p>
                <InputComponent type={"email"} value={email} setValue={setEmail} label={"Email"} invalidText={"กรุณากรอกอีเมลล์"} />
                <InputPasswordComponent value={password} setValue={setPassword} label={"Password"} invalidText={"กรุณากรอกรหัสผ่าน"} />
                <InputPasswordComponent value={confirmPassword} setValue={setConfirmPassword} label={"Confirm Password"} invalidText={"กรุณายืนยันรหัสผ่าน"} />
                <Button type="submit" className="my-3" color="success" size="lg">
                    <p className="text-xl">Sign up</p>
                </Button>
                <div className="mt-5 flex justify-center items-center">
                    <p className="text-sm p">มีบัญชีอยู่แล้วไช่หรือไม่?</p>
                    <Link to={"/Login"} className="text-sm text-green-600 p-5">เข้าสู่ระบบ</Link>
                </div>
            </form>
        </div>
    )
}