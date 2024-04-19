import React, { useMemo } from "react";
import {Textarea} from "@nextui-org/react";
import ProfileComponent from "./ProfileComponent";

export default function TextAreaComponent({value, setValue}) {

  return (
    <Textarea
      value={value}
      onValueChange={setValue}
      variant="bordered"
      label={<ProfileComponent />}
      placeholder="เขียนอะไรบางอย่าง..."
      className="max-w-xl"
      size="lg"
    />
  );
}