import { Input } from "@nextui-org/react";
import { useMemo } from "react";

export default function InputComponent({type, value, setValue, label, invalidText}) {

    const isInvalid = useMemo(() => {
        if (value === "" || value === null) return true;
        if (type === "number") {
            if (value < 0) {
                invalidText = "กรุณากรอกจำนวนให้ถูกต้อง";
                return true;                  
            } else {
                invalidText = {invalidText};
            }
        }
      }, [value]);

    return (
        <Input 
        className="my-5"
        size="lg"
        type={type}
        value={value}
        onValueChange={setValue}
        label={label}
        isInvalid={isInvalid}
        color={isInvalid ? "danger" : "success"}
        variant="bordered"
        errorMessage={isInvalid && `${invalidText}`}
        />
    )
}