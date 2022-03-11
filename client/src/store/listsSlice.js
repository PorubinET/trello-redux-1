import { createSlice } from '@reduxjs/toolkit'


let listId = 3;
let _id = 10;

export const listsSlice = createSlice({
    name: 'lists',
    initialState: {
        lists: [
            {
                name: "Jon",
                email: "user@mail.ru",
                title: "IN PROGRESS",
                listId: 0,
                cards: [
                    {
                        listId: 0,
                        id: `card-${0}`,
                        text: "class ",
                        description: "description 1",
                        time: "10.03.2022 21:36"
                    },
                    {
                        listId: 0,
                        id: `card-${1}`,
                        text: "created static 2",
                        description: "description 2",
                        time: "10.03.2022 21:36"
                    },
                    {
                        listId: 0,
                        id: `card-${2}`,
                        text: "created static 3",
                        description: "description 3",
                        time: "10.03.2022 21:36"
                    },
                ]
            },
            {
                name: "Jon",
                email: "user@mail.ru",
                title: "TO DO",
                listId: 1,
                cards: [
                    {
                        listId: 1,
                        id: `card-${3}`,
                        text: "created static 1",
                        description: "description 1",
                        time: "10.03.2022 21:36"
                    },
                    {
                        listId: 1,
                        id: `card-${4}`,
                        text: "created static 2",
                        description: "description 2",
                        time: "10.03.2022 21:36"
                    },
                    {
                        listId: 1,
                        id: `card-${5}`,
                        text: "created static 3",
                        description: "description 3",
                        time: "10.03.2022 21:36"
                    },
                    {
                        listId: 1, 
                        id: `card-${6}`,
                        text: "created static 4",
                        description: "description 4",
                        time: "10.03.2022 21:36"
                    },
                    {
                        listId: 1,
                        id: `card-${7}`,
                        text: "created static 5",
                        description: "description 5",
                        time: "10.03.2022 21:36"
                    }
                ]
            },
            {
                name: "Jon",
                email: "user@mail.ru",
                title: "TO DO2",
                listId: 2,
                cards: [
                    {
                        listId: 2,
                        email: "user@mail.ru",
                        id: `card-${8}`,
                        text: "created static 6",
                        description: "description 6",
                        time: "10.03.2022 21:36"
                    },
                    {
                        listId: 2,
                        email: "user@mail.ru",
                        id: `card-${9}`,
                        text: "created static 7",
                        description: "description 7",
                        time: "10.03.2022 21:36"
                    },

                ]
            },
        ]
    },
    reducers: {

        sort(state, action) {
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexEnd,
                droppableIndexStart,
                type
            } = action.payload;

            if (type === "list") {
                console.log("list")
                const list = state.lists.splice(+droppableIndexStart, 1);
                state.lists.splice(+droppableIndexEnd, 0, ...list)
            }

            if (droppableIdStart !== droppableIdEnd) {
                console.log("droppableIdStart !== droppableIdEnd")
                const listStart = state.lists.find((list) => +droppableIdStart === list.listId)
                const card = listStart.cards.splice(+droppableIndexStart, 1)
                const listEnd = state.lists.find((list) => +droppableIdEnd === list.listId)
                listEnd.cards.splice(+droppableIndexEnd, 0, ...card)
            }

            if (droppableIdStart !== "all-lists") {
                const list = state.lists.find((list) => +droppableIdStart === list.listId)
                const card = list.cards.splice(+droppableIndexStart, 1)
                list.cards.splice(+droppableIndexEnd, 0, ...card)
            }
        },

        addList(state, action) {
            const newList = {
                title: action.payload.text,
                listId: listId,
                cards: []
            }
            listId += 1
            return { ...state, lists: [...state.lists, newList] }
        },

        addCard(state, action) {          
            const newCard = {
                text: action.payload.text,
                id: `card-${_id}`,
                time: action.payload.time
            }
            _id += 1
            const newState = state.lists.map(list => {
                if (list.listId === action.payload._id) {
                    return { ...list, cards: [...list.cards, newCard] }
                }
                else return list
            })
            return { lists: newState }
        },

        changeCardText(state, action) {
            state.lists[action.payload.listId].cards = state.lists[action.payload.listId].cards.map(card => ({
                ...card,
                text: card.id === action.payload.id ? action.payload.text : card.text
            }))
        },

        changeCardDesc(state, action) {
            state.lists[action.payload.listId].cards = state.lists[action.payload.listId].cards.map(card => ({
                ...card,
                desc: card.id === action.payload.id ? action.payload.desc : card.desc
            }))
        },

        changeListTitle(state, action) {
            let newText = state.lists.map(list => ({ ...list, title: list.listId === action.payload._id ? action.payload.titleText : list.title }))
            console.log(newText)
        }
    },
})

export const { addList, addCard, sort, changeCardText, changeCardDesc, changeListTitle } = listsSlice.actions
export default listsSlice.reducer;

