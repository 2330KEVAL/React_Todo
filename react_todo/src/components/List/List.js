import React, { useState } from "react";
import "./List.css";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export const List = ({ todolist,deleteItem, editItem }) => {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditText(item.item);
  };

  const handleSave = (itemid) => {
    editItem(itemid, editText);
    setEditId(null);
    setEditText("");
  };

  return (
    <ul className="list">
      {
        todolist.map((listitem) => (
          <li key={listitem.id} >
            {editId === listitem.id ? 
            (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : 
           
              <span className="actions">{listitem.item}</span>
            
            }
            <span className="actions">
              <DeleteForeverIcon onClick={() => deleteItem(listitem.id)} />
              {
              editId === listitem.id ? 
              (
                <SaveIcon onClick={() => handleSave(listitem.id)} />
              ) :
               (
                <EditIcon onClick={() => handleEdit(listitem)} />
              )
              }
            </span>
          </li>
        ))
      }
    </ul>
  );
};

export default List;
