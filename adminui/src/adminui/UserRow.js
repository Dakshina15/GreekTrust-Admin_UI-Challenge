import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const UserRow = ({ value, handleEditClick, handleDeleteClick, selectRowHandler }) => {
  return ( 
      <tr className={value.selected ? 'select' : ""}>
             <td>
                  <input
                    type="checkbox"
                    checked={value.selected ?? ''}
                    onChange={() => {
                    selectRowHandler(value.id);
                    }}                                                                                                                                                         
                  />
            </td>
            <td>{value.name}</td>   
            <td>{value.email}</td>  
            <td>{value.role}</td> 
            <td>
              <IconButton aria-label="edit" style={{color:"black"}} onClick={(event)=>handleEditClick(event, value)}>
                <EditOutlinedIcon/>
              </IconButton> 
              <IconButton aria-label="delete" style={{color:"red"}} onClick={()=>handleDeleteClick(value.id)}>
                <DeleteOutlinedIcon />
              </IconButton>    
            </td>
      </tr>
  )
}
export default UserRow;