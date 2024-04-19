import React from "react";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function HealthBlogComponent({ id, title, subTitle, image }) {
    return (
        <Link className="w-full h-[300px] col-span-12 sm:col-span-6" to={`/Health-Information/${id}`}>
            <Card isFooterBlurred className="w-full h-[300px]">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">Blog</p>
                    <h4 className="text-white font-medium text-xl">{title}</h4>
                </CardHeader>
                <Image
                    isZoomed
                    removeWrapper
                    alt={title}
                    className="z-0 w-full h-full object-cover"
                    src={image}
                />
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-grow gap-2 items-center">
                        <p className="text-tiny text-white/60">{subTitle}</p>
                    </div>
                    <Button radius="full" size="sm">อ่านเพิ่มเติม</Button>
                </CardFooter>
            </Card>
        </Link>
    )
}