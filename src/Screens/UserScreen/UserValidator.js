export default function UserValidator(data) {
    let keys = Object.keys(data)
    for (let key in keys) {
        const errorFiled = keys[key].toLowerCase().replaceAll(keys[key][0], keys[key][0].toUpperCase())
        // eslint-disable-next-line
        if (errorFiled === "Phone" && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(data[keys[key]])) {
            return "Please Enter a Valid Phone"
        }
        if (errorFiled === "Password" && data[keys[key]].length < 4) return "Password can be at least four characters long "
        if (!data[keys[key]]) {
            return `Required field ${errorFiled} is Empty`
        }
    }
}