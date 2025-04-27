//      Usage Example
//
//      var People = [
//          { Name: "Name", Surname: "Surname" },
//          { Name: "AAA", Surname: "ZZZ" },
//          { Name: "Name", Surname: "AAA" }
//          ];
//      People.sort(DynamicSort("Name"));
//      People.sort(DynamicSort("Surname"));
//      People.sort(DynamicSort("-Surname"));


export function DynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return (a, b) => {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


//      Usage Example
//
//      People.sort(DynamicSortMultiple("Name", "-Surname"));
//

export function DynamicSortMultiple() {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    let props = arguments;
    return (obj1, obj2) => {
        let i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while (result === 0 && i < numberOfProperties) {
            result = DynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}