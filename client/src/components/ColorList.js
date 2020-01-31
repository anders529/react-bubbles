import React, {useState} from "react";
import axios from "axios";
const initialColor = {
    color: "",
    code: {hex: ""}
};
const ColorList = ({colors, updateColors}) => {
    console.log(colors);
    const [editing, setEditing] = useState(false);
    const [colorToEdit, setColorToEdit] = useState(initialColor);
    const editColor = color => {
        setEditing(true);
        setColorToEdit(color);
    };
    const saveEdit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/colors/${colors.id}`, updateColors)
            .then(response => {
                setEditing(response.boolean);
            })
            .catch(error => {
                console.log(error)
            })
    };
    const deleteColor = color => {
        axios.delete(`http://localhost:5000/api/colors/${color.id}`)
            .then(response => {
                console.log(response);
                this.props.history.push('/protected')
            })
    };
    return (
        <div className="colors-wrap">
            <p>colors</p>
            <ul>
                {colors.map(color => (
                    <li key={color.color} onClick={() => editColor(color)}>
                <span>
                    <span className="delete" onClick={e => {
                      e.stopPropagation();
                      deleteColor(color)}}>
                    x
                </span>{" "}
                    {color.color}
                </span>
                        <div className="color-box" style={{backgroundColor: color.code.hex}}/>
                    </li>))}
            </ul>
            {editing && (
                <form onSubmit={saveEdit}>
                    <legend>edit color</legend>
                    <label>
                        color name:
                        <input onChange={e => setColorToEdit(
                            {...colorToEdit, color: e.target.value})}
                               value={colorToEdit.color}/>
                    </label>
                    <label>
                        hex code:
                        <input onChange={e => setColorToEdit(
                            {...colorToEdit, code: {hex: e.target.value}})}
                               value={colorToEdit.code.hex}/>
                    </label>
                    <div className="button-row">
                        <button type="submit">save</button>
                        <button onClick={() => setEditing(false)}>cancel</button>
                    </div>
                </form>
            )}
            <div className="spacer"/>
        </div>
    )};
export default ColorList;
