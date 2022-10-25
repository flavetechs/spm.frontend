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

export const CheckSingleItem = (isChecked,  prevSelectedId, selectedId, objectArray = [], column = "") => {
    let selectedIds = [];
    objectArray.forEach((item) => {
        if (item[column] === selectedId) {
            if (isChecked) {
               // selectedIds.push(selectedId);
                selectedIds = [...prevSelectedId,selectedId]
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



export const TextEditorToolBar = {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }],
      ["image", "link"],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
          ],
        },
      ],
    ],
    //   handlers: {
    //     image: imageHandler
    //   }
  }

