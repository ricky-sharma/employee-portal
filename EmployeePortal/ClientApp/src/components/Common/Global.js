export default function IsNull(o) {
    if (o !== null && o !== undefined) {
        if (Object.prototype.toString.call(o) === '[object Array]') {
            if (Object.keys(o).length !== 0 && Object.getPrototypeOf(o) !== Object.prototype)
                return false
            else
                return true
        }
        return false
    }
    else
        return true
}