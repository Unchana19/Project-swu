import { Button, Input } from "@nextui-org/react";
import React, { useMemo, useState } from "react";

export default function InputEditComponent({type, value, setValue, label, invalidText}) {
    const [isEdit, setIsEdit] = useState(true);
    const [button, setButton] = useState(["Edit", "default"]);

    const isInvalid = useMemo(() => {
        if (value === "" || value === null) return true;
        invalidText = {invalidText}
      }, [value]);

    const editUsername = () => {
        if (isEdit) {
            setIsEdit(!isEdit);
            setButton(["Save", "success"]);
        } else {
            setIsEdit(!isEdit);
            setButton(["Edit", "default"]);
        }
    }

    return (
        <Input 
        className="my-2"
        size="lg"
        type={type}
        value={value}
        onValueChange={setValue}
        label={label}
        isInvalid={isInvalid}
        color={isInvalid ? "danger" : "success"}
        variant="bordered"
        errorMessage={isInvalid && `${invalidText}`}
        isReadOnly={isEdit}
        endContent={<Button color={button[1]} onPress={editUsername}>{button[0]}</Button>}
        />
    )
}