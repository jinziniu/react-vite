import React, { useEffect, useState, useRef } from "react";

function Form(props) {
    const [name, setName] = useState("");
    const [error, setError] = useState('');
    const [addition, setAddition] = useState(false);

    useEffect(() => {
        if (addition) {
            console.log("useEffect detected addition");
            props.geoFindMe();
            setAddition(false);
        }
    });

    function validateCoordinate(input) {
        const pattern = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
        return pattern.test(input);
    }

    function handleChange(event) {
        setName(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!name.trim()) {
            setError('Coordinate is required');
            return;
        }
        if (!validateCoordinate(name)) {
            setError('Invalid coordinate format. Please use "latitude, longitude".');
            return;
        }

        setError(''); // 清除错误信息
        setAddition(true);
        props.addTask(name);
        setName("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}

export default Form;
