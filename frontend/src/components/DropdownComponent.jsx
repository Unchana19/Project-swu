import React from "react";
import { useDisclosure, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn } from "@nextui-org/react";
import { EditDocumentIcon } from "./EditDocumentIcon.jsx";
import { DeleteDocumentIcon } from "./DeleteDocumentIcon.jsx";
import BarIcon from "./BarIcon.jsx";
import axios from "axios";
import { getSession } from "../services/authorize";
import ConfirmDeleteComponent from "./ConfirmDeleteComponent.jsx";

export default function DropdownComponent({ type, data, deleteSuccessPopup, setDeleteSuccessTextPopup }) {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteComment = () => {
    axios.delete(`${import.meta.env.VITE_API}/comment/${data._id}`,
      {
        headers: {
          Authorization: `Bearer ${getSession("token")}`
        }
      })
      .then(response => {
        setDeleteSuccessTextPopup(response.data.message);
        deleteSuccessPopup();
      }).catch(err => {
        setDeleteSuccessTextPopup(err.response.data.error);
        deleteSuccessPopup();
      });
  }

  const deletePost = () => {
    axios.delete(`${import.meta.env.VITE_API}/commentInPost/${data._id}`,
      {
        headers: {
          Authorization: `Bearer ${getSession("token")}`
        }
      })
      .then(response => {
        axios.delete(`${import.meta.env.VITE_API}/post/${data._id}`, {
          headers: {
            Authorization: `Bearer ${getSession("token")}`
          }
        })
          .then((response) => {
            setDeleteSuccessTextPopup(response.data.message);
            deleteSuccessPopup();
          }).catch(err => {
            setDeleteSuccessTextPopup(err.response.data.error);
            deleteSuccessPopup();
          });
      }).catch(err => {
        setDeleteSuccessTextPopup(err.response.data.error);
        deleteSuccessPopup();
      })
  }

  return (
    <div>
      <ConfirmDeleteComponent isOpen={isOpen} type={type} onOpenChange={onOpenChange} action={() => type === "Comment" ? deleteComment() : deletePost()} />
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
            onPress={() => onOpen()}
            key="delete"
            className="text-danger"
            color="danger"
            startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
          >
            Delete {type}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>

  );
}