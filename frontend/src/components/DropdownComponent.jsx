import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn } from "@nextui-org/react";
import { EditDocumentIcon } from "./EditDocumentIcon.jsx";
import { DeleteDocumentIcon } from "./DeleteDocumentIcon.jsx";
import BarIcon from "./BarIcon.jsx";

export default function DropdownComponent({type}) {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="bordered"
          size="sm"
        >
          <BarIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
        <DropdownItem
          key="edit"
          startContent={<EditDocumentIcon className={iconClasses} />}
        >
          Edit {type}
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
        >
          Delete {type}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}