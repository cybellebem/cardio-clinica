export default function FormInput({label,type,name,value,placeholder,onChange,required}){
    return(
        <label>
            <span>{label}</span>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
            />
        </label>
    )
}