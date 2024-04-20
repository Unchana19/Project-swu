import React from "react";
import { useEffect, useState } from "react"
import { getSession } from "../services/authorize";
import {Textarea} from "@nextui-org/react";
import ProfileComponent from "./ProfileComponent";

export default function TextAreaComponent({value, setValue}) {
  const [username, setUsername] = useState("");

  useEffect(() => {
      getSession("username") && setUsername(getSession("username"));
  }, []);

  return (
    <Textarea
      value={value}
      onValueChange={setValue}
      variant="bordered"
      label={<ProfileComponent username={username} usernameSize={"xl"} />}
      placeholder="เขียนอะไรบางอย่าง..."
      className="max-w-xl"
      size="lg"
    />
  );
}