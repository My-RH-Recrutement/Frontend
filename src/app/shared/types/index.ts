export type SelectData = { 
    value: string, 
    label: string
};

export type InputType = { 
    id: string, 
    type: string, 
    name: string, 
    value: string | File, 
    placeholder: string,
    label: string,
    formControll: string,
    onChange: any,
    required: boolean
};

export type Table = [
    theads: [],
    tbody: []
]