import { Avatar } from "@nextui-org/react";


export default function ProfileComponent({ username, usernameSize, description }) {

    return (
        <div className="flex gap-3 mb-2 items-center">
            <Avatar showFallback src='https://images.unsplash.com/broken' size="sm" />
            <div className="flex flex-col">
                <p className={`text-${usernameSize}`}>{username}</p>
                <p className="text-xs text-green-900/80">{description}</p>
            </div>
        </div>
    )
}