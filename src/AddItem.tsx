import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";

export type AddItemPropsType = {
    addItem: (title: string) => void
}

export const AddItem = React.memo((props: AddItemPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) setError(null);
        if (e.key === "Enter") {
            addItem();
        }
    }

    return (
        <div>
            <TextField
                id="standard-basic"
                value={title}
                variant={"outlined"}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <Button onClick={addItem} variant={"contained"} color={"default"} style={{margin:"15px"}}>+</Button>
        </div>
    )
})