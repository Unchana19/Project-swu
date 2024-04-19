import React, { useMemo } from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

export default function InputPasswordComponent({ value, setValue, label, invalidText }) {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const isInvalid = useMemo(() => {
        if (value === "" || value === null) return true;
        if (value.length < 6) {
            return true;
        }
        
    }, [value]);

    return (
        <Input
            className="my-2"
            size="lg"
            value={value}
            onValueChange={setValue}
            label={label}
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "success"}
            variant="bordered"
            errorMessage={isInvalid && `${invalidText}`}
            endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-green-600 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-green-600 pointer-events-none" />
                    )}
                </button>
            }
            type={isVisible ? "text" : "password"}
        />
    )
}