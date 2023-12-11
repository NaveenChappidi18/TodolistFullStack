import React, { useEffect, useState } from 'react';
function List({ totData,setChanged }) {
    const email = "kasasunil344@gmail.com";
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(totData);
    }, [totData])
    const updateLocalDataToFalse = (ind) => {
        let temp = [];
        for (let i = 0; i < data.length; i++) {
            if (i !== ind) {
                temp.push(data[i]);
            }
            else {
                temp.push([data[i][0], true]);
            }
        }
        setData(temp);
    }
    const clear = async(ind) => {
        await fetch(`http://localhost:3000/delete/${ind}/${email}`, {
            method: "DELETE",
            header: {
                "content-Type": "application/json",
            }
        });
        setChanged();
    }
    const updateArray = async (ind) => {
        let innerValue = document.getElementById("edit").value;
        console.log(innerValue);
        let prevValue = totData[ind][0];
        if (innerValue.trim() === "") {
            alert("Enter some value");
        }
        else if (innerValue !== prevValue) {
            await fetch(`http://localhost:3000/update/${ind}/${email}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    updatedTodo: innerValue,
                }),
            });
            setChanged();
        }
        else {
            setChanged();
        }
    }
    return (
        <div>
            {data.map((ele, index) => {
                if (ele[1]) {
                    return (
                        <span key={index}>
                            <br />
                            <input type="text" id="edit" placeholder={ele[0]} />
                            <button onClick={() => updateArray(index)}>ok</button>
                        </span>
                    );
                } else {
                    return (
                        <span key={index}>
                            <li>{ele[0]}</li>
                            <button onClick={() => { clear(index)  }}>complete</button>
                            <button onClick={() => { updateLocalDataToFalse(index); }}>edit</button>
                        </span>
                    );
                }
            })}
        </div>
    );
}

export default List;