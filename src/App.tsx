
import './App.scss'
import {useCallback, useMemo, useState} from "react";


type Filter = "все" | "не готовые" | "готовые";

const filterToDo = {
    all: "все",
    ready: "готовые",
    not_ready: "не готовые",

}


interface toDoType{
    id: string,
    text: string,
    condition: boolean,
}




function App() {

    const [toDoList, setToDoList] = useState<toDoType[]>([])
    const [inputValue, setInput] = useState<string>("")
    const [filter, setFilter] = useState<Filter>('все')




    const addToDoItem = useCallback(() => {
            if (inputValue.trim().length > 0) {
                const newTodo : toDoType = {
                    id: String(Date.now()),
                    text: inputValue.trim(),
                    condition: false
                }
                setToDoList((prevState) => ([...prevState, newTodo]))
                setInput("")
            }

    }, [inputValue])


    const updateCondition = useCallback((id : string) => {
        setToDoList((prevState) =>
            prevState.map((toDoItem) =>
                toDoItem.id === id ? { ...toDoItem, condition: !toDoItem.condition } : toDoItem
            )
        );
    }, [])

    const deleteToDoItem = useCallback((id: string) => {
        setToDoList((prevState) =>
            prevState.filter((toDoItem) => toDoItem.id !== id)
        )
    }, [])

    const toggleFilter = useMemo(() => toDoList.filter((todoItem) => {
        if(filter === 'готовые'){
            return todoItem.condition
        }
        else if(filter === 'не готовые'){
            return !todoItem.condition
        }
        else return true
    }), [filter, toDoList])

    return (
        <main className={"app-container"}>
            <header className={"app-header"}>
                <h1>TODO</h1>
                <form className={"form-horizontal"}>
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={inputValue} type="text" placeholder={'Ввести задачу'}/>
                    <button onClick={addToDoItem} type={'button'} className={"btn"}>Добавить</button>
                </form>
                <div className={'filter-container'}>
                    {Object.entries(filterToDo)
                        .map(([_, value]) => (

                            <button className={"btn"} onClick={() => setFilter(value as Filter)}>{value}</button>


                        )
                        )}
                </div>
                    <ul className={"todo-list"}>
                        {toggleFilter.length > 0
                            ?
                            (toggleFilter.map((toDoItem) => (
                                    <li className={"todo-item"}>
                                        <div className={"todo-item-left"}>
                                            <input checked={toDoItem.condition} type={'checkbox'}
                                                   onChange={() => updateCondition(toDoItem.id)}/>
                                            <span
                                                className={toDoItem.condition ? "todo-item-name isCompleted" : "todo-item-name"}>{toDoItem.text}</span>
                                        </div>
                                        <button onClick={() => deleteToDoItem(toDoItem.id)} className={'btn red'}>Удалить
                                        </button>
                                    </li>
                                )))
                            :
                            (
                                "NO DATA"
                            )

                        }
                    </ul>
            </header>
        </main>
    )
}

export default App
