import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import HealthBlog from "../data/HealthBlog";
import { Image } from "@nextui-org/react";

export default function HealthBlogDetailPage() {
    const { blogId } = useParams();
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [contentTitle, setContentTitle] = useState([]);
    const [content, setContent] = useState([]);
    const [image, setImage] = useState();

    useEffect(() => {
        const result = HealthBlog.find((item) => item.id === blogId);
        setTitle(result.title);
        setDetail(result.detail);
        setContentTitle(result.contentTitle);
        setContent(result.content);
        setImage(result.image);
    }, []);

    return (
        <div className="w-full max-w-4xl my-10 p-10 flex flex-col items-center justify-center">
            <Image
                width={300}
                height={200}
                src={image}
                alt={title}
            />
            <div className="mt-10 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold mb-3">{title}</p>
                <p>{detail}</p>
                {contentTitle.map((item, index) => {
                    return <div className="py-3">
                        <p className="text-xl my-2">{contentTitle[index]}</p>
                        <p>{content[index]}</p>
                    </div>
                })}
            </div>
        </div>
    )
}