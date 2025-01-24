
import './App.scss'
import { useCallback, useState} from "react";


enum Condition {
    ALL = 'all',
    READY = 'ready',
    NOT_READY = 'no ready',
}

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
    const [filter, setFilter] = useState<Condition>(Condition.ALL)




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

                            <button className={"btn"}>{value}</button>


                        )
                        )}
                </div>
                    <ul className={"todo-list"}>
                        {toDoList.map((toDoItem) => (
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
                        ))}

                    </ul>
            </header>
        </main>
    )
}

export default App
