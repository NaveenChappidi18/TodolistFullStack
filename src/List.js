function List({ children, func }) {
    const clear = (ind) => {
        const updatedChildren = children.filter((_, index) => index !== ind);
        console.log(updatedChildren);
        func(updatedChildren);
    }

    const edit = (val, ind) => {
        let arr = [];
        for (let i = 0; i < children.length; i++) {
            if (i == ind) {
                if (val.length > 0)
                    arr.push([val, false]);
                else
                    arr.push([children[i][0], false]);
            }
            else {
                arr.push(children[i]);
            }
        }
        func(arr);
    }
    const updateArray = (ind) => {
        let arr = [];
        for (let i = 0; i < children.length; i++) {
            if (i == ind) {
                arr.push([children[i][0], true]);
            }
            else {
                arr.push(children[i]);
            }
        }
        func(arr);
    }
    return (
        <div>
            {children.map((ele, index) => {
                if (ele[1]) {
                    return (
                        <span key={index}>
                            <br />
                            <input type="text" id="edit" placeholder={ele[0]} />
                            <button onClick={() => edit(document.getElementById("edit").value,index)}>ok</button>
                        </span>
                    );
                } else {
                    return (
                        <span key={index}>
                            <li>{ele[0]}</li>
                            <button onClick={() => clear(index)}>complete</button>
                            <button onClick={() => updateArray(index)}>edit</button>
                        </span>
                    );
                }
            })}
        </div>
    );
}

export default List;
