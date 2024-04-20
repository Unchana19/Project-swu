import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { getSession } from "../services/authorize";
import SendIcon from "./SendIcon";

export default function InputCommentComponet({ value, setValue, postId }) {
    const comment = () => {
        const author = getSession("username");
        const content = value;
        axios.post(`${import.meta.env.VITE_API}/comment`, { postId, author, content },
            {
                headers: {
                    Authorization: `Bearer ${getSession("token")}`
                }
            })
            .then(response => {
                window.location.reload()
            }).catch(err => {

            });
    }

    return (
        <Input
            className="mb-2"
            type="text"
            label="Comment"
            size="sm"
            value={value}
            onValueChange={setValue}
            isDisabled={!getSession("username")}
            endContent={
                postId && <Button onPress={comment} size="sm" isIconOnly ><SendIcon /></Button>
            }
        />

    )
}