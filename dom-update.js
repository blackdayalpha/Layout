
window.onload = function () {
    let isClicked = false;
    let LStartAppDiv = pvtCreateDivElement('start-app-div w-[95vw] h-[15%]', 'start_application_div');

    let LStartAppBtn = pvtCreateButton('btn font-bold bg-blue-300 rounded-sm p-2 m-6', 'start-app-btn', 'Start Application', null, "Click to Start Application");
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
    let LExternalContainer = pvtCreateDivElement('flex flex-col flex-wrap  min-h-screen relative');

    let LFormContainer = pvtCreateDivElement('form relative flex flex-1 flex-col w-[90vw]  h-[25%] p-2 self-center justify-center bg-blue-100');
    let LOptionContainer = pvtCreateDivElement('selectors md:flex-row flex-col flex md:w-[50%] self-center bg-[#8DCBE6] border-b justify-around py-3 my-8');

    let LRadio1Container = pvtCreateDivElement('p-1 m-1');
    let LRadio1OptionLbl = pvtCreateRadioLabel('Using DIV', 'change', 'option', pvtgenerateDivContent, 'div-radio');
    LRadio1Container.appendChild(LRadio1OptionLbl);

    let LRadio2Container = pvtCreateDivElement('p-1 m-1');
    let LRadio2OptionLbl = pvtCreateRadioLabel('Using Table', 'change', 'option', pvtGenerateTable, 'table-radio');
    LRadio2Container.appendChild(LRadio2OptionLbl);

    LOptionContainer.appendChild(LRadio1Container);
    LOptionContainer.appendChild(LRadio2Container);

    let LInputContainer = pvtCreateDivElement('input-section self-center p-5 md:w-[50%]');
    let LFormElement = pvtCreateFormElement('submit', pvtAddUser);

    let LFirstNameInput = pvtCreateInputElement('text', 'First Name', 'first_name', true, "m-1");
    let LLastNameInput = pvtCreateInputElement('text', 'Last Name', 'last_name', true, 'm-1');
    let LSubmitDataBtn = pvtCreateButton('btn bg-blue-300 rounded-sm p-2 m-6 text-nowrap font-bold', 'add-user-btn', 'ADD USER', null, 'Click to add user');

    LFormElement.appendChild(LFirstNameInput);
    LFormElement.appendChild(LLastNameInput);
    LFormElement.appendChild(LSubmitDataBtn);

    LInputContainer.appendChild(LFormElement);

    LFormContainer.appendChild(LOptionContainer);
    LFormContainer.appendChild(LInputContainer);



    LShowDiv = pvtCreateDivElement("flex relative flex-1 md:flex-row flex-col md:w-[95vw] h-[35vh] ", 'displayer')

    let LTableContainer = pvtCreateDivElement('table-section justify-center md:w-[45vw] w-[95vw]  h-[100%] flex flex-1 flex-col');

    let LTitle = pvtCreateDivElement('p-1 m-2 font-bold bg-[#8DCBE6] ', null, 'User List');
    let LDisplayArea = pvtCreateDivElement('data-display bg-gray-300 h-60 overflow-auto m-2', 'data-display-area');

    LTableContainer.appendChild(LTitle);
    LTableContainer.appendChild(LDisplayArea);
    LShowDiv.appendChild(LTableContainer);

    LTableContainer = pvtCreateDivElement('table-section justify-center md:w-[45vw] w-[95vw]  h-[80%] flex flex-1 flex-col');
    LTitle = pvtCreateDivElement('p-1 m-2 font-bold bg-[#8DCBE6] ', null, 'JSON');
    let LJsonTextArea = pvtCreateTextBoxElement();
    LTableContainer.appendChild(LTitle);
    LTableContainer.appendChild(LJsonTextArea);
    LShowDiv.appendChild(LTableContainer);


    let LGenerateJsonDiv = pvtCreateDivElement('flex relative justify-center item-center flex-1 md:h-[10%] bg-grey-100  lg:h-[25%] md:flex-row flex-col generate-json items-center  rounded-sm p-1 m-6');

    // let LButtonDiv = pvtCreateDivElement('flex flex-col  items-start flex-1');
    let LGenerateJSONBtn = pvtCreateButton('generate-json h-min btn bg-blue-300 font-bold rounded-sm p-2 m-6 text-nowrap', 'generate-json-btn', 'Generate JSON', pvtGenerateJSON, "Generate JSON");
    let LAddNewJsonDataBtn = pvtCreateButton('generate-json h-min w-max btn bg-blue-300 font-bold rounded-sm p-2 m-6 text-nowrap', 'json-data-add', 'Updata Data', pvtUpdataObjectData, "Update Object");
    // LButtonDiv.appendChild(LGenerateJSONBtn);
    // LButtonDiv.appendChild(LAddNewJsonDataBtn);
    LGenerateJsonDiv.appendChild(LGenerateJSONBtn);
    LGenerateJsonDiv.appendChild(LAddNewJsonDataBtn);
    // LGenerateJsonDiv.appendChild(LJsonTextArea);
    // LGenerateJsonDiv.appendChild(LGenerateJSONBtn);
    // LGenerateJsonDiv.appendChild(LButtonDiv);

    LExternalContainer.appendChild(LFormContainer)
    LExternalContainer.appendChild(LShowDiv)
    LExternalContainer.appendChild(LGenerateJsonDiv);

    return LExternalContainer;
}

function pvtAddUser(event) {

    event.preventDefault();
    let LFirstNameInput = document.getElementById('first_name');
    let LLastNameInput = document.getElementById('last_name');



    let LIsRadioSelected = pvtCheckSelection();
    if (LIsRadioSelected && pvtValidateInputString(LFirstNameInput.value.trim(), LLastNameInput.value.trim())) {
        // console.log(LFirstNameInput.value)
        let LIndexOfCurrEntry = GDataObj.UserData.length;
        let LDataArr = [];
        LDataArr.push(LFirstNameInput.value);
        LDataArr.push(LLastNameInput.value);

        GDataObj.UserData.push({ data: LDataArr });

        pvtDisplayDataInDiv();

    } else if (!LIsRadioSelected) { alert('select an option to display data') } else {
        alert('Please enter valid data');
    }

    LFirstNameInput.value = ''
    LLastNameInput.value = ''
}

function pvtDisplayDataInDiv() {

    const LDivRadioBtn = document.getElementById('div-radio');
    const LTableRadioBtn = document.getElementById('table-radio');
    if (LDivRadioBtn.checked) {
        pvtgenerateDivContent();
    } else if (LTableRadioBtn.checked) {
        pvtGenerateTable();
    }
}

function pvtCheckSelection() {
    const LDivRadioBtn = document.getElementById('div-radio');
    const LTableRadioBtn = document.getElementById('table-radio');
    if (LDivRadioBtn.checked || LTableRadioBtn.checked)
        return true
    else return false;
}

function pvtDeleteElement() {
    // event.preventDefault();
    let LChoice = confirm('Do you want to delete?');
    if (LChoice) {
        let LId = event.target.id;
        if (LId === 'delete') {
            let child = event.target.parentElement.parentElement;
            let parent = child.parentNode;
            let index = pvtGetIndexOfSelectedItem(parent, child)

            GDataObj.UserData.splice(index, 1);
            pvtDisplayDataInDiv()
        } else {
            alert('Delete Not Found!')
        }
    } else {
        console.log('not deleted');
    }

}

function pvtValidateInputString(p_strFirstName, p_strLastName) {
    const regex = /^[A-Za-z][a-z]*$/;
    const LFNameLength = p_strFirstName.length;
    const LLNameLength = p_strLastName.length;
    if (regex.test(p_strFirstName) && regex.test(p_strLastName) && LFNameLength > 1 && LFNameLength < 15 && LLNameLength > 1 && LLNameLength < 15) {
        return true;
    } else return false;
}

function pvtGenerateTable() {
    // console.log('Generating table');
    let LTableHeadClass = "text-sm font-bold border-solid border-2 border-black text-center text-[#4F200D] bg-[#9DF1DF]  px-6 py-4 text-left";
    let LTableHeadScope = 'col';
    let LTableHeadingName = ['First Name', 'Last Name', 'Delete'];

    const LTableElement = pvtCreateTableElement("min-w-full");

    LTHeadElement = pvtCreateTableHeadElement('bg-white border-b');

    LTableHeadRow = pvtCreateTableRowElement(null);

    for (let i = 0; i < LTableHeadingName.length; i++) {
        let LTableHeadCell = pvtCreateTableHeadCell(LTableHeadClass, LTableHeadScope, LTableHeadingName[i]);
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
    // console.log('generating div Table')
    let LDivHeadClass = "md:text-sm text-xs text-center bg-[#9DF1DF] flex-1 max-width-xs font-bold flex-1 text-gray-900 px-6 py-4 text-left"
    let LDivHeadingName = ['First Name', 'Last Name', 'Delete'];

    const LDivULElement = pvtCreateULElement('min-w-full flex-nowrap');

    let LListElement = pvtCreateListElement("bg-white border-b flex justify-around", null);

    for (let i = 0; i < LDivHeadingName.length; i++) {
        let LDivHeadCell = pvtCreateSpanElement(LDivHeadClass, LDivHeadingName[i]);
        LListElement.appendChild(LDivHeadCell);
    }

    let LDataObject = GDataObj;

    let LTraverse = pvtGetAllUserDataInTable(LDataObject, 'div');
    for (let key of LTraverse) {
        LDivULElement.appendChild(key);
    }

    let LArea = document.getElementById('data-display-area');
    LArea.innerHTML = '';
    LArea.appendChild(LListElement);
    LArea.appendChild(LDivULElement);

}

function pvtPromptData() {
    let child = event.target.parentElement;
    let parent = child.parentNode;
    let LIndex = pvtGetIndexOfSelectedItem(parent, child);

    alert(`Full Name : ${GDataObj.UserData[LIndex].data[0]}  ${GDataObj.UserData[LIndex].data[1]}`);
}

function pvtGetIndexOfSelectedItem(p_varParent, p_varChild) {
    return Array.prototype.indexOf.call(p_varParent.children, p_varChild);
}

function pvtGetAllUserDataInTable(p_objData, p_strDisplayType) {
    // console.log('Get all user data')
    let bool = true;
    let LTableBodyElementArr = [];
    for (let i = 0; i < p_objData.UserData.length; i++) {
        let LTableRowElement;

        if (p_strDisplayType == 'table') {
            LTableRowElement = pvtCreateTableRowElement(pvtPromptData);
        }
        else if (p_strDisplayType == 'div') {
            LTableRowElement = pvtCreateListElement('flex justify-around', pvtPromptData);
        }

        if (bool) {
            LTableRowElement.className += ' bg-[#E3F6FF] border-b';
            bool = false;
        } else {
            LTableRowElement.className += ' bg-[#FFEA20] border-b';
            bool = true;
        }

        let LDataArr = p_objData.UserData[i].data;
        let LTraverse = p_objData[p_strDisplayType];

        for (let index = 0; index < LDataArr.length; index++) {
            let LTableData = pvtCreateTableDataElement(LTraverse.tagName, LTraverse.className, LDataArr[index]);
            LTableRowElement.appendChild(LTableData);
        }

        let LTableData = pvtCreateTableDataElement(LTraverse.tagName, LTraverse.className, p_objData.anchor);
        LTableRowElement.appendChild(LTableData);

        LTableBodyElementArr.push(LTableRowElement);
    }

    return LTableBodyElementArr;
}

function pvtGenerateJSON() {
    let LDataObject = GDataObj;
    // console.log('generating json')
    let LJsonString = JSON.stringify(LDataObject, null, 2);
    // let LJsonArea = document.getElementById('data-display-area');
    let LJsonArea = document.getElementById('json-text-display');

    LJsonArea.value = "";
    LJsonArea.value = (LJsonString);
}

function pvtUpdataObjectData() {
    try {
        let LJsonArea = document.getElementById('json-text-display').value;
        let LUpdatedObj = JSON.parse(LJsonArea);

        GDataObj = LUpdatedObj;
        pvtDisplayDataInDiv();

    } catch (e) {
        alert("Please Enter Proper Json String");
    }

}

let GDataObj = {
    UserData: [
        // {
        //     data: ['Dipesh', 'Marathe'],
        // }
        // , {
        //     data: ['Mayur', 'Kumavat' ],
        // }
    ],
    anchor: '<a class="cursor-pointer font-bold  hover:text-red-500" id="delete" onclick="pvtDeleteElement()" title="delete">&#x2715;</a>',
    table: {
        tagName: 'td',
        className: 'text-sm border-solid border-2 border-black text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap',
    },
    div: {
        tagName: 'div',
        className: 'md:text-sm text-[5px]  text-center flex-1 max-width-xs text-gray-900 font-light md:px-3 md:py-4 px-3 py-2 whitespace-wrap',
    },
}



// Helper Functions to create Elements of the HTML page

function pvtCreateDivElement(p_strClassName, p_strId = null, p_strTextContent) {
    let div = document.createElement('div');
    div.className = p_strClassName;
    div.textContent = p_strTextContent;
    if (p_strId) div.id = p_strId;
    return div;
}
function pvtCreateSpanElement(p_strClassName, p_strTextContent) {
    let span = document.createElement('span');
    span.className = p_strClassName;
    span.textContent = p_strTextContent;
    return span;
}
function pvtCreateULElement(p_strClassName) {
    let LUnorderListElement = document.createElement('ul');
    LUnorderListElement.className = p_strClassName;
    return LUnorderListElement;
}
function pvtCreateListElement(p_strClassName, p_handleEvent) {
    let li = document.createElement('li');
    li.addEventListener('click', p_handleEvent);
    li.className = p_strClassName;
    return li;
}

function pvtCreateTextBoxElement() {
    let className = "block p-2.5 m-2 md:w-[45vw] w-[95vw] h-60   text-xs overflow-auto text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    let LTextAreaElement = document.createElement('textarea');
    LTextAreaElement.className = className;
    LTextAreaElement.rows = 10;
    LTextAreaElement.id = 'json-text-display';
    LTextAreaElement.hidden = true;
    return LTextAreaElement;
}

function pvtCreateButton(p_strClassName, id, textContent, p_evtHandlerFunction, p_StrTitle) {
    let button = document.createElement('button');
    button.className = p_strClassName;
    button.id = id;
    button.title = p_StrTitle;
    button.addEventListener('click', p_evtHandlerFunction);
    button.textContent = textContent;
    return button;
}

function pvtCreateRadioLabel(textContent, eventType, name, eventHandler, id) {
    let label = document.createElement('label');
    label.className = 'cursor-pointer font-bold p-2'
    let input = pvtCreateInputElement('radio', null, id, true);
    input.addEventListener(eventType, eventHandler);
    label.title = textContent;
    input.name = name;
    input.className = 'm-2 p-2 cursor-pointer'
    label.appendChild(input);
    label.appendChild(document.createTextNode(textContent));
    return label;
}

function pvtCreateFormElement(eventType, eventHandler) {
    let form = document.createElement('form');
    form.className = 'flex-col align-middle md:flex flex-1 md:flex-row justify-center w-auto  '
    form.addEventListener(eventType, eventHandler);
    return form;
}

function pvtCreateInputElement(p_strType, p_StrPlaceholder, id, required, p_strClassName) {
    let input = document.createElement('input');
    input.type = p_strType;
    input.className = p_strClassName;
    if (p_StrPlaceholder) input.placeholder = p_StrPlaceholder;
    if (id) input.id = id;
    if (required) input.required = required;
    return input;
}

function pvtCreateTableElement(p_strClassName) {
    let table = document.createElement('table');
    table.className = p_strClassName;
    return table;
}

function pvtCreateTableHeadElement(p_strClassName) {
    let thead = document.createElement('thead');
    thead.className = p_strClassName;
    return thead;
}

function pvtCreateTableRowElement(p_handleEvent) {
    let LTrElement = document.createElement('tr');
    LTrElement.addEventListener('click', p_handleEvent);
    return LTrElement;
}

function pvtCreateTableHeadCell(p_strClassName, p_strScope, p_strTextContent) {
    let th = document.createElement('th');
    th.className = p_strClassName;
    th.scope = p_strScope;
    th.textContent = p_strTextContent;
    return th;
}

function pvtCreateTableDataElement(p_varTagName, p_strClassName, p_varInnerHTML) {
    // console.log('delete created')
    let td = document.createElement(p_varTagName);
    td.className = p_strClassName;
    td.innerHTML = p_varInnerHTML;
    return td;
}
