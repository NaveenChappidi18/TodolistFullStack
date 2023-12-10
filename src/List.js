import React, { useEffect, useState } from 'react';
function List() {
    const email = "kasasunil344@gmail.com";
    const [change, setChange] = useState(0);
    let arr = [];
    const [totData, setTotData] = useState(arr);
    useEffect(() => {
        const data = fetch(`http://localhost:3000/list/${email}`).then((res) => res.json());
        data.then((res) => {
            setTotData(res);
            console.log(res,totData);
        });
    }, [change]);
    const clear = (ind) => {
        fetch(`http://localhost:3000/delete/${ind}/${email}`, {
            method: "DELETE",
            header: {
                "content-Type": "application/JSON",
            }
        });
        const c = 1 - change;
        setChange(c);
    }

    // const edit = (val, ind) => {
        
    // }
    // const updateArray = (ind) => {
    //     let arr = [];
    //     for (let i = 0; i < children.length; i++) {
    //         if (i == ind) {
    //             arr.push([children[i][0], true]);
    //         }
    //         else {
    //             arr.push(children[i]);
    //         }
    //     }
    //     func(arr);
    // }
    return (
        <div>
            {totData.map((ele, index) => {
                if (ele.isOk) {
                    return (
                        <span key={index}>
                            <br />
                            <input type="text" id="edit" placeholder={ele.data} />
                            {/* <button onClick={() => edit(document.getElementById("edit").value,index)}>ok</button> */}
                        </span>
                    );
                } else {
                    return (
                        <span key={index}>
                            <li>{ele.data}</li>
                            <button onClick={() => clear(index)}>complete</button>
                            {/* <button onClick={() => updateArray(index)}>edit</button> */}
                        </span>
                    );
                }
            })}
        </div>
    );
}

export default List;
