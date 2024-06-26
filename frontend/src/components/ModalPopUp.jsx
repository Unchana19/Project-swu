import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Progress } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function ModalPopup({ isOpen, onOpenChange, text, link, progress }) {

  const refreshPage = (onClose) => {
    onClose();
    if (link !== "Login") {
      window.location.reload();
    }
  }

  return (
    <>
      <Modal hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-slate-950 text-2xl flex flex-col gap-1"></ModalHeader>
              <ModalBody className="flex flex-col justify-center items-center">
                {progress !== null && <Progress size="md" aria-label="Loading..." value={progress} />}
                <p className="text-slate-950 font-bold text-2xl text-center my-5">
                  {text}
                </p>
              </ModalBody>
              <ModalFooter className="flex justify-center items-center">
                {link != null ? (<Link to={`/${link}`}>
                  <Button color="danger" variant="light" onPress={() => refreshPage(onClose)}>
                    Close
                  </Button>
                </Link>) : (<Button color="danger" variant="light" onPress={() => refreshPage(onClose)}>
                  Close
                </Button>)}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}