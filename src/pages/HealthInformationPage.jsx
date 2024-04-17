import React from "react";
import HealthBlogComponent from "../components/HealthBlogComponent";
import HealthBlog from "../data/HealthBlog";

export default function HealthInformationPage() {
    return (
        <div className="mt-10 mb-20 px-5">
            <div className="gap-3 grid grid-cols-12">
                {HealthBlog.map((item) => {
                    return <HealthBlogComponent key={item.id} id={item.id} title={item.title} subTitle={item.subTitle} image={item.image} />
                })}
            </div>
        </div>
    )
}