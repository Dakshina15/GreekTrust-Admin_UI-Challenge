import React from "react";
import "./EditableRow.css";
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const EditableRow = ({
  editUserData,
  handleEditDataChange,
  handleCancelClick,
  value,
  selectRowHandler,
}) => {
  return (
    <tr>
      <td>
        <input
          checked={value.selected ?? ""}
          onChange={() => {
            selectRowHandler(value.id);
          }}
          type="checkbox"
        />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter Name.."
          name="name"
          value={editUserData.name}
          onChange={handleEditDataChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter EmailId.."
          name="email"
          value={editUserData.email}
          onChange={handleEditDataChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter Role.."
          name="role"
          value={editUserData.role}
          onChange={handleEditDataChange}
        ></input>
      </td>
      <td>
        <IconButton type="submit" style={{ color: "black" }}>
          <SaveIcon />
        </IconButton>
        <IconButton style={{ color: "black" }} onClick={handleCancelClick}>
          <CancelIcon />
        </IconButton>
      </td>
    </tr>
  );
};
export default EditableRow;
