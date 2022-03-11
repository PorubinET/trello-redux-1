import * as React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { Grid } from "@mui/material";
import { changeCardText, changeCardDesc } from "../../store/listsSlice"
import Typography from '@mui/material/Typography';


import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';


import "./dialogs.scss"

export default function FormDialog({ text, id, listId, desc, name, email, time }) {

  const [open, setOpen] = React.useState(false);
  let [textCard, setTextCard] = useState(text);
  let [descCard, setDescCard] = useState(desc);

  const dispatch = useDispatch();

  const changeText = (e) => {
    setTextCard(textCard = e.target.value)
  }

  const changeDesc = (e) => {
    setDescCard(textCard = e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      setDate()
    }
  }

  const setDate = () => {
    dispatch(changeCardText({ id, listId, text: textCard }))
    dispatch(changeCardDesc({ id, listId, desc: descCard }))
    handleClose()
  }

  return (
    <div>
      <EditIcon className="card__icon" />
      <div className="card__wrapp" onClick={handleClickOpen}></div>
      <Typography>
        <span className="card__text-wrapp">{text}</span>
      </Typography>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            autoFocus
            margin="dense"
            label="Rename"
            variant="standard"
            type="text"
            id={String(id)}
            fullWidth
            value={textCard}
            onKeyDown={handleKeyDown}
            onChange={changeText}
            style={{ width: "30%" }}
          />
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  J
                </Avatar>
              </IconButton>
            }
            title={name}
            subheader={email}
            style={{ textAlign: "right" }}
          />
        </DialogTitle>
        
        <DialogContent style={{ width: 550 }}>
          <Grid
            marginTop={2}
            display="flex"
            justifyContent="center">
            <TextField
              type="text"
              onChange={changeDesc}
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={descCard}
              style={{ width: "100%" }}
              multiline
            />
          </Grid>
        </DialogContent>
        <span className='dialogs__time'>{time}</span>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={setDate}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}