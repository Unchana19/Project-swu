import { useEffect, useState } from "react"
import { getSession } from "../services/authorize";
import { Avatar } from "@nextui-org/react";


export default function ProfileComponent() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        getSession("username") && setUsername(getSession("username"));
    }, []);

    return (
        <div className="flex gap-4 mb-2 items-center">
            <Avatar showFallback src='https://images.unsplash.com/broken' />
            <p className="text-xl">{username}</p>
        </div>
    )
}