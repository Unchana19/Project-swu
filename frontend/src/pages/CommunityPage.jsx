import { useEffect, useState } from "react";
import TextAreaComponent from "../components/TextAreaComponent";
import { Button, useDisclosure, Spinner } from "@nextui-org/react";
import axios from "axios";
import { getSession } from "../services/authorize";
import ModalPopup from "../components/ModalPopUp";
import PostComponent from "../components/PostComponent";

export default function CommunityPage() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [textPopup, setTextPopup] = useState("");
    const [link, setLink] = useState("Community");
    const [isLoadingPost, setIsLoadingPost] = useState(false);
    const [isLoadingCreate, setIsLoadingCreate] = useState(false);
    const [progress, setProgress] = useState(0);

    const [content, setContent] = useState("");
    const [allPosts, setAllPosts] = useState([]);

    const fetchPosts = () => {
        setIsLoadingPost(true);

        axios.get(`${import.meta.env.VITE_API}/posts`)
            .then(response => {
                setAllPosts(response.data);
            }).catch(err => {
                setLink(null);
                setTextPopup(err.response.data.error);
                onOpen()
            }).finally(() => {
                setIsLoadingPost(false);
            });
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const communityPost = (e) => {
        e.preventDefault();
        setIsLoadingCreate(true);

        if (getSession("username")) {
            const author = getSession("username");
            axios.post(`${import.meta.env.VITE_API}/create`, { author, content },
                {
                    headers: {
                        Authorization: `Bearer ${getSession("token")}`
                    }
                }, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                }
            })
                .then(response => {
                    setLink("Community");
                    setTextPopup("สร้างโพสต์สำเร็จ");
                    onOpen()

                    setContent("");
                }).catch(err => {
                    setTextPopup(err.response.data.error);
                    onOpen()
                }).finally(() => {
                    setIsLoadingCreate(false);
                });
        } else {
            setLink("Login");
            setTextPopup("กรุณาเข้าสู่ระบบก่อน");
            onOpen();
        }
    }

    return (
        <div className="w-full flex flex-col justify-center items-center py-10 px-3">
            <ModalPopup isOpen={isOpen} onOpenChange={onOpenChange} text={textPopup} buttonText={"Close"} link={link} progress={null} />
            {isLoadingCreate && (
                <ModalPopup isOpen={true} onOpenChange={() => { }} text={"กำลังสร้างโพสต์..."} buttonText={null} link={null} progress={progress} />
            )}
            <form onSubmit={communityPost} className="w-full flex flex-col justify-center items-center gap-5">
                <TextAreaComponent value={content} setValue={setContent} />
                <Button type="submit" className="px-10" color="success">
                    โพสต์
                </Button>
            </form>
            {isLoadingPost ? (
                <Spinner color="success" size="large" className="my-10" />
            ) : (
                <div className="w-full max-w-xl my-10 flex flex-col gap-5">
                    {allPosts.map((post, index) => (
                        <PostComponent key={index} post={post} onOpen={onOpen} setTextPopup={setTextPopup} />
                    ))}
                </div>
            )}
        </div>
    )
}