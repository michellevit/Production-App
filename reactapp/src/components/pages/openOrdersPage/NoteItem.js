import React from "react";
import "./NoteItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const NoteItem = ({ note, notes, setNotes, readyStatus }) => {
  const deleteHandler = (e) => {
    let newNotes = notes.filter((el) => el.id !== note.id);
    setNotes(newNotes);
  };
  return (
    <div className="noteitem">
      <div className="noteitem-info">
        <b>Note {notes.indexOf(note) + 1}: </b>
        {note.noteText}
      </div>
      {!readyStatus && (
      <button className="xmark-btn" onClick={deleteHandler}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      )}
    </div>
  );
};

export default NoteItem;
