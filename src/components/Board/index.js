import React, { useState } from 'react'
import produce from 'immer'
import { loadLists } from '../../services/api'
import { Container } from './styles'
import BoardContext from './context'
import List from '../List'
const data = loadLists()

export default function Board() {
    const [lists, setLists] = useState(data)

    const move = (fromList, toList, from, to) => {
        console.log(fromList)
        setLists(produce(lists, draft => {
            const dragged = draft[fromList].cards[from]
            draft[fromList].cards.splice(from, 1)
            draft[toList].cards.splice(to, 0, dragged)
        }))
    }

    return (
        <BoardContext.Provider value={{ lists, move }}>

            <Container>
                {lists.map((list, index) => <List index={index} key={list.title} data={list} />)}
            </Container>
        </BoardContext.Provider>
    )
}
