import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <Button onPress={() => scrollToTop()}
            color=""
            className={`fixed ${isVisible ? "flex" : "hidden"} bottom-3 right-3 z-50`}
            isIconOnly
        >
            <svg
                fill="green"
                viewBox="0 0 16 16"
                height="2.5em"
                width="2.5em"
            >
                <path d="M12 0H4a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2zM7.5 6.707L6.354 7.854a.5.5 0 11-.708-.708l2-2a.5.5 0 01.708 0l2 2a.5.5 0 01-.708.708L8.5 6.707V10.5a.5.5 0 01-1 0V6.707z" />
            </svg>
        </Button>
    );
}
