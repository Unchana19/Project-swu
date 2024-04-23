import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { getSession } from "../services/authorize";
import SendIcon from "./SendIcon";
import ModalPopup from "../components/ModalPopUp";
import { useState } from "react";

export default function InputCommentComponet({ value, setValue, postId }) {
    const [isLoading, setIsLoading] = useState(false);

    const comment = () => {
        setIsLoading(true);
        const author = getSession("username");
        const content = value;

        axios.post(`${import.meta.env.VITE_API}/comment`, { postId, author, content },
            {
                headers: {
                    Authorization: `Bearer ${getSession("token")}`
                }
            })
            .then(response => {
                window.location.reload();
            }).catch(err => {
    
            }).finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div>
            {isLoading && (
                <ModalPopup isOpen={true} onOpenChange={() => { }} text={"กำลังสร้างความคิดเห็น..."} buttonText={null} link={null} />
            )}
            <Input
                className="mb-2"
                type="text"
                label="เพิ่มความคิดเห็น..."
                size="sm"
                value={value}
                onValueChange={setValue}
                isDisabled={!getSession("username")}
                endContent={
                    postId && <Button onPress={comment} size="sm" isIconOnly ><SendIcon /></Button>
                }
            />
        </div>
    )
}