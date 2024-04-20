import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import ProfileComponent from "./ProfileComponent";
import InputCommentComponent from "../components/InputCommentCompponent";
import axios from "axios";
import { getSession } from "../services/authorize";
import DropdownComponent from "../components/DropdownComponent";

export default function PostComponent({ post, onOpen, setTextPopup }) {
    const [comment, setComment] = useState("");
    const [allComment, setAllComment] = useState([]);

    const fetchComment = () => {
        const postId = post._id;
        axios.post(`${import.meta.env.VITE_API}/comments`, { postId })
            .then(response => {
                setAllComment(response.data);
            }).catch(err => {
            });
    }

    useEffect(() => {
        fetchComment();
    }, []);

    return (
        <Card shadow="none" className="w-full border-1 border-green-400">
            <CardHeader className="flex gap-3 justify-between">
                <div className="flex flex-col">
                    <ProfileComponent username={post.author} description={`${new Date(post.createdAt).toLocaleString()}`} />
                </div>
                {post.author === getSession("username") && <DropdownComponent type={"Post"} data={post} successPopup={onOpen} setSuccessTextPopup={setTextPopup} />}
            </CardHeader>
            <CardBody className="max-h-80 overflow-y-auto">
                <p>{post.content}</p>
            </CardBody>
            <CardFooter>
                <div className="w-full flex flex-col gap-2 max-h-80 overflow-y-auto">
                    <InputCommentComponent value={comment} setValue={setComment} postId={post._id} />
                    {
                        allComment.map((comment, index) => {
                            return (
                                <div className="flex justify-between">
                                    <ProfileComponent key={comment._id} username={comment.author} usernameSize={"xs"} description={comment.content} />
                                    {comment.author === getSession("username") && <DropdownComponent key={index} type={"Comment"} data={comment} successPopup={onOpen} setSuccessTextPopup={setTextPopup} />}
                                </div>
                            )
                        })
                    }
                </div>
            </CardFooter>
        </Card>
    );
}
