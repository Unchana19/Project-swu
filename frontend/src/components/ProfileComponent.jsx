import { Avatar } from "@nextui-org/react";


export default function ProfileComponent({ username, usernameSize, description }) {

    return (
        <div className="flex gap-3 mb-2 items-start">
            <Avatar showFallback src='https://images.unsplash.com/broken' size="sm" />
            <div className="flex flex-col xl:max-w-md max-w-60">
                <p className={`text-${usernameSize}`}>{username}</p>
                <p className="text-xs text-green-900/80 text-balance">{description}</p>
            </div>
        </div>
    )
}