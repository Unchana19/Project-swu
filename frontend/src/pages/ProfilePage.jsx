import { Button, Avatar } from "@nextui-org/react";
import { getSession, logout } from "../services/authorize";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import InputEditComponent from "../components/InputEditComponent";

export default function ProfilePage() {
    const navigate = useNavigate();

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
            <Avatar showFallback src='https://images.unsplash.com/broken' className="w-20 h-20 text-large my-5" />
            <InputEditComponent value={username} setValue={setUesrname} label={"Username"} invalidText={"กรุณากรอกชื่อผู้ใช้งาน"} />
            <Button onPress={() => logout(() => refreshPage())} className="px-10 my-10" color="danger">
                Log out
            </Button>
        </div>
    )
}