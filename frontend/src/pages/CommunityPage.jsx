import { useState } from "react";
import TextAreaComponent from "../components/TextAreaComponent";
import { Button, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { getSession } from "../services/authorize";
import ModalPopup from "../components/ModalPopUp";

export default function CommunityPage() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [textPopup, setTextPopup] = useState("");
    const [link, setLink] = useState();

    const [content, setContent] = useState("");

    const communityPost = (e) => {
        e.preventDefault();
        if (getSession("username")) {
            setLink(null);
            const author = getSession("username");
            axios.post(`${import.meta.env.VITE_API}/create`, {author, content})
            .then(response => {
                setTextPopup("สร้างโพสต์สำเร็จ");
                onOpen()

                setContent("");
            }).catch(err => {
                setTextPopup(err.response.data.error);
                onOpen()
            })
        } else {
            setLink("Login");
            setTextPopup("กรุณาเข้าสู่ระบบก่อน");
            onOpen()
        }
        
    }

    return (
        <div className="w-full flex flex-col justify-center items-center py-10">
            <ModalPopup isOpen={isOpen} onOpenChange={onOpenChange} text={textPopup} buttonText={"Close"} link={link} />
            <form onSubmit={communityPost} className="w-full flex flex-col justify-center items-center gap-5">
                <TextAreaComponent value={content} setValue={setContent} />
                <Button type="submit" className="px-10" color="success">
                    โพสต์
                </Button>
            </form>
            <div>

            </div>
        </div>
    )
}