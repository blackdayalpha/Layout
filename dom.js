window.onload = function () {
    let isClicked = false;
    let LStartAppDiv = createDivElement('start-app-div w-[95vw]', 'start_application_div');

    let LStartAppBtn = createButton('btn bg-blue-300 rounded-sm p-1 m-6', 'start-app-btn', 'Start Application');
    LStartAppBtn.addEventListener('click', () => {
        if (!isClicked) {
            isClicked = true;
            document.body.appendChild(pvtStartApplication());
        } else {
            alert('Application already started');
        }
    });

    LStartAppDiv.appendChild(LStartAppBtn);
    document.body.appendChild(LStartAppDiv);
}

function pvtStartApplication() {
    let LExternalContainer = createDivElement('container flex flex-col flex-wrap width-screen');

    let LFormContainer = createDivElement('form flex flex-1 flex-col w-[90vw] p-2 self-center bg-blue-100');
    let LOptionContainer = createDivElement('selectors md:flex-row flex-col flex md:w-[50%] self-center bg-blue-300 justify-around py-3 my-8');

    let LRadio1Container = createDivElement('p-1');
    let LRadio1OptionLbl = createRadioLabel('Using DIV', 'change', 'option', pvtgenerateDivContent);
    LRadio1Container.appendChild(LRadio1OptionLbl);

    let LRadio2Container = createDivElement('p-1');
    let LRadio2OptionLbl = createRadioLabel('Using Table', 'change', 'option', pvtGenerateTable);
    LRadio2Container.appendChild(LRadio2OptionLbl);

    LOptionContainer.appendChild(LRadio1Container);
    LOptionContainer.appendChild(LRadio2Container);

    let LInputContainer = createDivElement('input-section self-center p-5 md:w-[50%]');
    let LFormElement = createFormElement('submit', pvtAddUser);

    let LFirstNameInput = createInputElement('text', 'First Name', 'first_name', true);
    let LLastNameInput = createInputElement('text', 'Last Name', 'last_name', true);
    let LSubmitDataBtn = createButton('btn bg-blue-300 rounded-sm p-1 m-6', 'add-user-btn', 'ADD USER');

    LFormElement.appendChild(LFirstNameInput);
    LFormElement.appendChild(LLastNameInput);
    LFormElement.appendChild(LSubmitDataBtn);

    LInputContainer.appendChild(LFormElement);

    LFormContainer.appendChild(LOptionContainer);
    LFormContainer.appendChild(LInputContainer);

    let LTableContainer = createDivElement('table-section w-[95vw] flex flex-1 flex-col');

    let LTitle = createDivElement('p-1 m-2 font-bold bg-gray-500', 'User List');
    let LDisplayArea = createDivElement('data-display bg-gray-300 h-60 overflow-auto m-2', 'data-display-area');

    LTableContainer.appendChild(LTitle);
    LTableContainer.appendChild(LDisplayArea);

    let LGenerateJsonDiv = createDivElement('btn generate-json self-end bg-blue-300 rounded-sm p-1 m-6');
    let LGenerateJSONBtn = createButton('btn generate-json btn bg-blue-300 rounded-sm p-1 m-6', 'generate-json-btn', 'Generate JSON');
    LGenerateJsonDiv.appendChild(LGenerateJSONBtn);

    LExternalContainer.appendChild(LFormContainer)
    LExternalContainer.appendChild(LTableContainer)
    LExternalContainer.appendChild(LGenerateJsonDiv);

    return LExternalContainer;
}

function pvtAddUser(event) {

    event.preventDefault();
    let LFirstNameInput = document.getElementById('first_name');
    let LLastNameInput = document.getElementById('last_name');
    if (pvtValidateInputString(LFirstNameInput.value, LLastNameInput.value)) {
        console.log(LFirstNameInput.value)
        let LIndexOfCurrEntry = GDataObj.UserData.length;
        let LDataArr = [];
        LDataArr.push(LFirstNameInput.value);
        LDataArr.push(LLastNameInput.value);
        LDataArr.push('<a class="cursor-pointer underline hover:text-blue-100" onclick="pvtDeleteElement(event)" title="delete">Delete</a>');

        GDataObj.UserData.push({ data: LDataArr });
        LFirstNameInput.value = ''
        LLastNameInput.value = ''
        console.log(GDataObj.UserData)

        pvtGenerateTable();

    } else {
        alert('Please enter valid data');
    }
}

function pvtDeleteElement(event) {
    let child = event.target.parentElement.parentElement;
    let parent = child.parentNode;
    let index = Array.prototype.indexOf.call(parent.children, child);

    GDataObj.UserData.splice(index, 1);
    pvtGenerateTable();

}

function pvtValidateInputString(p_strFirstName, p_strLastName) {
    const regex = /^[A-Za-z][a-z]*$/;
    if (regex.test(p_strFirstName.trim()) && regex.test(p_strLastName.trim())) {
        return true;
    } else return false;
}

function pvtCreateListElement() {

    // create li element
    const LListElement = document.createElement("li");

    // add the details to the elements
    LListElement.className = "collection-item  teal lighten-2 border-all";
    LListElement.id = "new-item";
    LListElement.title = "New Item";

    // onclick event to assign the task as completed
    LListElement.onclick = pvtTaskDone;
    LListElement.appendChild(document.createTextNode(p_strInputTaskText));
    // creating anchor tag
    const LAnchorElement = document.createElement("a");

    LAnchorElement.className = "delete-item secondary-content";
    LAnchorElement.innerHTML = '<i class="fa fa-remove"></i>';
    // appending anchor tag to the li
    LListElement.appendChild(LAnchorElement);
    // returning the final element created
    return LListElement;
}

function pvtGenerateTable() {
    console.log('Generating table');
    let LTableHeadClass = "text-sm font-bold text-gray-900 px-6 py-4 text-left";
    let LTableHeadScope = 'col';
    let LTableHeadingName = ['First Name', 'Last Name', 'Delete'];

    const LTableElement = createTableElement("min-w-full");

    LTHeadElement = createTableHeadElement('bg-white border-b');

    LTableHeadRow = createTableRowElement();

    for (let i = 0; i < LTableHeadingName.length; i++) {
        let LTableHeadCell = createTableHeadCell(LTableHeadClass, LTableHeadScope, LTableHeadingName[i]);
        LTableHeadRow.appendChild(LTableHeadCell);
    }

    LTHeadElement.appendChild(LTableHeadRow);
    LTableElement.appendChild(LTHeadElement);

    let LDataObject = GDataObj;
    let LTableBodyElement = document.createElement('tbody');
    let LDataArr = pvtGetAllUserDataInTable(LDataObject, 'table');
    for (let key of LDataArr) {
        LTableBodyElement.appendChild(key);
    }
    LTableElement.appendChild(LTableBodyElement);


    let LArea = document.getElementById('data-display-area');
    LArea.innerHTML = '';
    LArea.appendChild(LTableElement);

}

function pvtgenerateDivContent() {
    console.log('Div content generated');
}

function pvtGetAllUserDataInTable(p_objData, p_strDisplayType) {
    console.log('Get all user data')
    let bool = true;
    let LTableBodyElementArr = [];
    for (let i = 0; i < p_objData.UserData.length; i++) {
        let LTableRowElement = createTableRowElement();
        if (bool) {
            LTableRowElement.className = 'bg-gray-100 border-b';
            bool = false;
        } else {
            LTableRowElement.className = 'bg-white border-b';
            bool = true;
        }
        let LDataArr = p_objData.UserData[i].data;
        let LTraverse = p_objData[p_strDisplayType];
        let LElementIndex = 0;
        console.log(LDataArr)
        for (let index = 0; index < LDataArr.length; index++) {
            if (index == 3) LElementIndex = 1;
            const LTableData = createTableDataElement(`${LTraverse[LElementIndex].tagName}`, LTraverse[LElementIndex].className, LDataArr[index]);
            LTableRowElement.appendChild(LTableData);
        }
        LTableBodyElementArr.push(LTableRowElement);
    }
    console.log(LTableBodyElementArr[1]);
    return LTableBodyElementArr;
}

function createDivElement(className, id = null) {
    let div = document.createElement('div');
    div.className = className;
    if (id) div.id = id;
    return div;
}

function createButton(className, id, textContent) {
    let button = document.createElement('button');
    button.className = className;
    button.id = id;
    button.textContent = textContent;
    return button;
}

function createRadioLabel(textContent, eventType, name, eventHandler) {
    let label = document.createElement('label');
    let input = createInputElement('radio', null, null, null);
    input.addEventListener(eventType, eventHandler);
    input.title = textContent;
    input.name = name;
    label.appendChild(input);
    label.appendChild(document.createTextNode(textContent));
    return label;
}

function createFormElement(eventType, eventHandler) {
    let form = document.createElement('form');
    form.addEventListener(eventType, eventHandler);
    return form;
}

function createInputElement(type, placeholder, id, required) {
    let input = document.createElement('input');
    input.type = type;
    if (placeholder) input.placeholder = placeholder;
    if (id) input.id = id;
    if (required) input.required = required;
    return input;
}

function createTableElement(className) {
    let table = document.createElement('table');
    table.className = className;
    return table;
}

function createTableHeadElement(className) {
    let thead = document.createElement('thead');
    thead.className = className;
    return thead;
}

function createTableRowElement() {
    return document.createElement('tr');
}

function createTableHeadCell(className, scope, textContent) {
    let th = document.createElement('th');
    th.className = className;
    th.scope = scope;
    th.textContent = textContent;
    return th;
}

function createTableDataElement(tagName, className, innerHTML) {
    let td = document.createElement(tagName);
    td.className = className;
    td.innerHTML = innerHTML;
    return td;
}


const GDataObj = {
    UserData: [
        // {
        //     data: ['1', 'Dipesh', 'Marathe', 'Delete'],
        // }, {
        //     data: ['2', 'Mayur', 'Kumavat', 'Delete'],
        // }
    ],

    table: [{
        tagName: 'td',
        className: 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap',
    }, {
        tagName: 'td',
        className: 'text-sm font-light px-6 py-4 text-blue-900',
    }],
    div: {

    }
}
