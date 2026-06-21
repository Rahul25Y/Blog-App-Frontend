import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const ReadMoreModal = ({ text = "", maxLength = 30, title = "Details" }) => {
  const [open, setOpen] = useState(false);

  if (!text) return "-";

  const isLongText = text.length > maxLength;

  return (
    <>
      {!open && (
        <>
          {text.slice(0, maxLength)}
          {isLongText && "... "}

          {isLongText && (
            <button
              onClick={() => setOpen(true)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "var(--primary-color)",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Read More
            </button>
          )}
        </>
      )}

      <Modal isOpen={open} toggle={() => setOpen(false)} centered size="lg">
        <ModalHeader toggle={() => setOpen(false)}>{title}</ModalHeader>

        <ModalBody
          style={{
            whiteSpace: "pre-wrap",
            maxHeight: "65vh",
            overflowY: "auto",
          }}
        >
          {text}

          <div className="text-end mt-3">
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "bg-primary",
                border: "1px solid var(--primary-color)",
                padding: "4px 15px",
                borderRadius: "4px",
                color: "var(--primary-color)",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 600,
              }}
              className="bg-primary"
            >
              Close
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ReadMoreModal;
