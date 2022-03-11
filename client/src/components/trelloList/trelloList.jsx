import { useState, React } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import TrelloCard from "../trelloCards/trelloCard"
import TrelloActionButton from "../TrelloActionButton/TrelloActionButton";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Droppable, Draggable } from "react-beautiful-dnd";
import {changeListTitle} from "../../store/listsSlice" 
import styled from "styled-components"


import "./trelloList.scss"

const ListContainer = styled.div`
    background-color: #d8dde0;
    border-radius: 3px;
    max-width: 300px;
    padding: 8px;
    height: 100%;
    margin-right: 8px;
  `;

const TrelloList = ({ title, cards, _id, index, position, email, name }) => {
  let [titleText, setTitle] = useState(title);
  const dispatch = useDispatch();


  const changeTitleText = (e) => {
    setTitle(titleText = e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      e.currentTarget.setAttribute("readonly", "true")
      dispatch(changeListTitle({_id, titleText}))
    }
  }

  const removeAttribute = (e) => {
    e.currentTarget.removeAttribute("readonly", "true")
  }

  return (
    <Draggable draggableId={String(_id)} position={position} index={index}>
      {provided => (
        <ListContainer
          {...provided.draggableProps}
              ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(_id)}>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <form>
                  <input className="titleList"
                    type="text"
                    onChange={changeTitleText}
                    onClick={removeAttribute}
                    onKeyDown={handleKeyDown}
                    id={_id}
                    value={titleText}
                    readOnly
                  >
                  </input>
                </form>
                <MoreHorizIcon />
                {cards.map((card, index) =>
                  <Grid item xs={12} key={card.id} index={index} cards={cards} >
                    <TrelloCard
                      key={card.id}
                      text={card.text}
                      id={card.id}
                      desc={card.description}
                      listId={card.listId}
                      time={card.time}
                      index={index}
                      cards={cards}
                      name={name}
                      email={email}
                    />
                  </Grid>
                )}
                {provided.placeholder}
                <TrelloActionButton _id={_id} />
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>


  )
}

export default TrelloList

