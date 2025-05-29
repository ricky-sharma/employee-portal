export default function IsNull(o) {
    if (o !== null && o !== undefined && o.length !== 0) {
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

export function GetCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    let cookieVal = ''
    ca.map((c, i) => {
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            cookieVal = c.substring(name.length, c.length);
        }
        return null
    })
    return cookieVal;
}

export function ReplaceSpecialChars(str) {
    return str.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f")
        .split(String.fromCharCode(92)).join(String.fromCharCode(92, 92))
        .replace(/[\u0000-\u0019]+/g, "");// eslint-disable-line
}

export const IsDev = () => {
    return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}

export const objectsEqual = (o1, o2) =>
    (IsNull(o1) && IsNull(o2)) || (!IsNull(o1) && !IsNull(o2) &&
        Object.keys(o1).length === Object.keys(o2).length
        && Object.keys(o1).every(p => o1[p] === o2[p]));