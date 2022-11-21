export interface PoolDetail {
    name: String, 
    poolName: String, 
    link: String,
    address: String, 
    info: String
}

export interface Input{
    label: String,
    placeholder: String,
    value: String,
    helptext: String,
    requirements:  {
        required: Boolean,
        min_length: Number,
        max_length: Number,
    }
}

export interface Select{
    label: String,
    placeholder: String,
    value: String,
    helptext: String,
    required: Boolean,
    options: Array<String>,
}

export interface TextArea{

}

export interface Date{
    label: String,
    placeholder: String,
    value: String,
    helptext: String,
            requirements: {
                required: Boolean,
                min_length: Number,
                max_length: Number,
            }
}