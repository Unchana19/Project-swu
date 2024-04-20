import React, { useState } from "react";
import { useDisclosure, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn } from "@nextui-org/react";
import { EditDocumentIcon } from "./EditDocumentIcon.jsx";
import { DeleteDocumentIcon } from "./DeleteDocumentIcon.jsx";
import BarIcon from "./BarIcon.jsx";
import axios from "axios";
import { getSession } from "../services/authorize";
import ConfirmDeleteComponent from "./ConfirmDeleteComponent.jsx";
import UpdateModalComponent from "./UpdateModalComponent.jsx";

export default function DropdownComponent({ type, data, successPopup, setSuccessTextPopup }) {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const modal = useDisclosure();
  const updateModal = useDisclosure();

  const [content, setContent] = useState("");

  const deleteComment = () => {
    axios.delete(`${import.meta.env.VITE_API}/comment/${data._id}`,
      {
        headers: {
          Authorization: `Bearer ${getSession("token")}`
        }
      })
      .then(response => {
        setSuccessTextPopup(response.data.message);
        successPopup();
      }).catch(err => {
        setSuccessTextPopup(err.response.data.error);
        successPopup();
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
            setSuccessTextPopup(response.data.message);
            successPopup();
          }).catch(err => {
            setSuccessTextPopup(err.response.data.error);
            successPopup();
          });
      }).catch(err => {
        setSuccessTextPopup(err.response.data.error);
        successPopup();
      })
  }

  const updatePost = () => {
    axios.put(`${import.meta.env.VITE_API}/post/${data._id}`, { content },
      {
        headers: {
          Authorization: `Bearer ${getSession("token")}`
        }
      })
      .then(response => {
        setSuccessTextPopup(response.data.message);
        successPopup();
      }).catch(err => {
        setSuccessTextPopup(response.data.message);
        successPopup();
      })
  }

  const updateComment = () => {
    axios.put(`${import.meta.env.VITE_API}/comment/${data._id}`, { content },
      {
        headers: {
          Authorization: `Bearer ${getSession("token")}`
        }
      })
      .then(response => {
        setSuccessTextPopup(response.data.message);
        successPopup();
      }).catch(err => {
        setSuccessTextPopup(response.data.message);
        successPopup();
      });
  }

  return (
    <div>
      <UpdateModalComponent type={type} isOpen={updateModal.isOpen} onOpenChange={updateModal.onOpenChange} action={() => type === "Comment" ? updateComment() : updatePost()} content={content} setContent={setContent} data={data} />
      <ConfirmDeleteComponent type={type} isOpen={modal.isOpen} onOpenChange={modal.onOpenChange} action={() => type === "Comment" ? deleteComment() : deletePost()} />
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
            onPress={() => updateModal.onOpen()}
            key="edit"
            startContent={<EditDocumentIcon className={iconClasses} />}
          >
            Edit {type}
          </DropdownItem>
          <DropdownItem
            onPress={() => modal.onOpen()}
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