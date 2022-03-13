import * as React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { Grid } from "@mui/material";
import { changeCardText, changeCardDesc, sort } from "../../store/listsSlice"
import Typography from '@mui/material/Typography';


import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';





import "./dialogs.scss"

export default function FormDialog({ text, id, listId, desc, name, email, time, indexList }) {

  const [open, setOpen] = React.useState(false);
  let [profOpen, setProfOpen] = useState(false)
  let [move, setMove] = useState(false)
  let [textCard, setTextCard] = useState(text);
  let [descCard, setDescCard] = useState(desc);

  const lists = useSelector(state => state.lists.lists)

  // console.log(lists.map(list => list.title))

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

  const clickProfOpen = () => {
    setProfOpen(profOpen = true)
  }

  const handleClose = () => {
    setProfOpen(false)
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      setDate()
    }
  }

  const openMove = () => {
    setMove(true)
  }

  const closeMove = () => {
    setMove(false)
  }

  const setDate = () => {
    dispatch(changeCardText({ id, listId, text: textCard }))
    dispatch(changeCardDesc({ id, listId, desc: descCard }))
    handleClose()
  }

  const moveRight = (indexEnd) => {
    dispatch(sort({ indexStart: indexList, id, indexEnd, move}))
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

          <Dialog open={move} onClose={closeMove}>
            {lists.map((list, index) =>
              <Button
                key={list.listId}
                index={index}
                onClick={() => moveRight(index)}
              >
                {list.title}
              </Button>
            )}
          </Dialog>

          <TextField
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
              <IconButton aria-label="settings" onClick={clickProfOpen}>
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  J
                </Avatar>
              </IconButton>
            }
            title={name}
            style={{ textAlign: "right" }}
          />
          <Dialog open={profOpen} onClose={handleClose}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent style={{ width: "320px", display: "flex", justifyContent: "space-between" }}>
                <Grid style={{ textAlign: "left" }}>
                  <Typography variant="body2" color="text.secondary">
                    <span>{name}</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <span>{email}</span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <span>8989-888-88-88</span>
                  </Typography>
                </Grid>
                <Grid>
                  <Avatar sx={{ bgcolor: red[500], width: "60px", height: "60px" }} aria-label="recipe">
                    J
                  </Avatar>
                </Grid>
              </CardContent>
              <CardActions style={{ justifyContent: "space-between" }}>
                <Button size="small" onClick={handleClose}>Close</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Dialog>
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
          <Button onClick={openMove}>move card</Button>
          {/* <Button onClick={moveRight}>move right</Button> */}
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={setDate}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}