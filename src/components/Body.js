import {useState} from 'react';
import './Body.css';


const Body = () => {
    if(localStorage.getItem('comments') == null) {
        localStorage.setItem('comments', JSON.stringify([]));
    }
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('comments')));
    const [contestSlug, setContestSlug] = useState('');
    // const [updateIDX, setUpdateIDX] = useState(-1);
    // const [updateValue, setUpdateValue] = useState('');

    const contestSlugChangedHandler = (event) => {
        setContestSlug(event.target.value);
    }
    const submitHandler = (event) => {
        event.preventDefault();
        if(contestSlug === "") {
            return alert('You can not add empty string')
        }
        setUsers((prevState => {
            return (
                [...prevState, contestSlug]
            )
        }));
        let comments = JSON.parse(localStorage.getItem('comments'));
        localStorage.setItem('comments',JSON.stringify([...comments, contestSlug]));
        
        setContestSlug('');
    }
    const deleteClicked = (idx) => {
        let comments = JSON.parse(localStorage.getItem('comments'));
        comments.splice(idx, 1);
        setUsers(comments);
        localStorage.setItem('comments', JSON.stringify(comments));
    }
    // const updateClicked = (idx) => {
    //     let comments = [...users];
    //     comments[idx] = updateValue;
    // }
    return (
        <div className = "body">
            <div>
                <form>
                    <input type = "text" value = {contestSlug} onChange = {contestSlugChangedHandler}/>
                    <input type = "submit" value = "add" onClick = {submitHandler}/>
                </form>
            </div>
            <div>
                {users.length === 0 ? <p>input something</p> : (users.map((el,idx) => (
                    <h4 key = {idx}>
                        {el}
                        <button key = {idx} onClick = {() => deleteClicked(idx)}>delete</button>
                        {/* <button key = {idx + "1"} onClick = {()=>{setUpdateIDX(idx);setUpdateValue('')}}>update</button>
                        <input type = "text" placeholder = "enter updated value" hidden = {updateIDX !== idx}/>
                        <button hidden = {updateIDX !== idx} onClick = {() => {updateClicked(idx)}}>confirm update</button> */}
                    </h4>
                )))}
            </div>
        </div>
    )
}

export default Body;