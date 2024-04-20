import React, { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import TextAreaComponent from "../components/TextAreaComponent";
import InputCommentComponent from "../components/InputCommentCompponent";

export default function UpdateModalComponent({ type, isOpen, onOpenChange, action, content, setContent, data }) {
    useEffect(() => {
        setContent(data.content);
    }, []);

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            <ModalBody className="text-slate-950 font-bold text-2xl text-center my-5">
                                {type === "Comment" ?
                                    <InputCommentComponent value={content} setValue={setContent} postId={null} />
                                    : <TextAreaComponent value={content} setValue={setContent} />}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="success" onPress={() => action(onClose)}>
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}