import { Input } from "@nextui-org/react";
import React, { useMemo } from "react";

export default function InputComponent({type, value, setValue, label, invalidText}) {
    const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    const isInvalid = useMemo(() => {
        if (value === "" || value === null) return true;
        if (type === "number") {
            if (value < 0) {
                invalidText = "กรุณากรอกจำนวนให้ถูกต้อง";
                return true;                  
            }
        }
        if (type == "email") {
            invalidText = "กรุณากรอกรูปแบบอีเมลล์ที่ถูกต้อง";
            return validateEmail(value) ? false : true;
        }
        invalidText = {invalidText}
      }, [value]);

      const limitInput = (value) => {
        if (value.length <= 20) {
            setValue(value);
        }
      }

    return (
        <Input 
        className="my-2"
        size="lg"
        type={type}
        value={value}
        onValueChange={type === "text" ? ((value) => limitInput(value)) : (setValue)}
        label={label}
        isInvalid={isInvalid}
        color={isInvalid ? "danger" : "success"}
        variant="bordered"
        errorMessage={isInvalid && `${invalidText}`}
        />
    )
}