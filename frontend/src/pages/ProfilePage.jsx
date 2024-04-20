import { Button, Avatar, useDisclosure } from "@nextui-org/react";
import { getSession, logout } from "../services/authorize";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import InputEditComponent from "../components/InputEditComponent";
import ConfirmLogoutComponent from "../components/ConfirmLogout";

export default function ProfilePage() {
    const navigate = useNavigate();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [username, setUesrname] = useState("");

    useEffect(() => {
        if (getSession("username")) {
            setUesrname(getSession("username"));
        } else {
            refreshPage();
        }
    }, []);

    const refreshPage = () => {
        navigate("/")
        window.location.reload()
    }

    return (
        <div className="w-full max-w-xl flex flex-col items-center justify-center py-10">
            <ConfirmLogoutComponent isOpen={isOpen} onOpenChange={onOpenChange} action={() => logout(() => refreshPage())} />
            <Avatar showFallback src='https://images.unsplash.com/broken' className="w-20 h-20 text-large my-5" />
            <InputEditComponent value={username} setValue={setUesrname} label={"Username"} invalidText={"กรุณากรอกชื่อผู้ใช้งาน"} />
            <Button onPress={() => onOpen()} className="px-10 my-10" color="danger">
                Log out
            </Button>
        </div>
    )
}