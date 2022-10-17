export function ordinalSuffixOf(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

export function isNumber(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if (iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
        return false;
    return true;
}


export function stripHtml(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    let result = tmp.textContent || tmp.innerText || "";
    tmp.innerHTML = '';
    return result;
}


export const HandleMultipleCheckbox = (event, selectedArray) => {
    const checkBoxValue = event.target.checked;
    const checkedValue = event.target.id;
    const otherSelectedArray = selectedArray.filter((item) => item !== checkedValue);
    if (checkBoxValue === false) {
        return [...otherSelectedArray];
    } else {
        return [...otherSelectedArray, checkedValue];
    }
};

export const ReturnFilteredList = (arrayofObjects = [], searchQuery = "", columns = []) => { 
    return arrayofObjects && arrayofObjects.filter((item) => {
        if (searchQuery === "") {
            return item;
        }
        for (let i = 0; i < columns.length; i++) {
            if (item[columns[i]]?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
                return item;
        }
       
    });
}

export const CheckSingleItem = (isChecked, selectedId, objectArray = [], column = "") => {
    let selectedIds = [];
    objectArray.forEach((item) => {
        if (item[column] === selectedId) {
            if (isChecked) {
                selectedIds.push(selectedId);
                item.isChecked = true;
            } else {
                item.isChecked = false;
                const index = selectedIds.indexOf(selectedId);
                if (index > -1) {
                    selectedIds.splice(index, 1);
                }
            }
        }
    });
    return [objectArray, selectedIds]
};
export const CheckMultiple = (isChecked = false, objectArray = [], column = "") => {
    let selectedIds = [];
    objectArray.forEach((item) => {
        if (isChecked === true) {
            selectedIds.push(item[column]);
            item.isChecked = true;
        } else {
            selectedIds = [];
            item.isChecked = false;
        }
    });
    return [objectArray, selectedIds]
};

