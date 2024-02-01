let GDataHeadElement, GListHeadElement;
// total number of input data [Fname , LName]
const GINPUT_DATA_ROW = 2;

/**
 * @property {UserData} - This is an Array of an objects Which consist of Array of with property as 'data'
 * @property {anchor} - This is the HTML text for the delete button
 * @property {heading} - This is Heading components required 
 * @property {table} - This is an Object having 2 properties i.e. @property {tagName} and @property {className}
 * @property {div}- This is an Object having 2 properties i.e. @property {tagName} and @property {className} 
 * 
 */
let GDataObj = {
    UserData: [
    ],
    anchor: '<a class="delete cursor-pointer font-bold  hover:text-red-500" onclick="pvtRemoveRow()" title="delete">&#x2715;</a>',
    heading: {
        headingClass: 'text-sm text-center table-cell bg-[#9DF1DF]  max-width-xs font-bold text-gray-900 px-6 py-4',
        headingContent: ['#', 'First Name', 'Last Name', 'Delete']
    },
    table: {
        headerClass: 'min-w-full border-collapse',
        tagName: 'td',
        className: 'text-sm border-solid border-2 border-black text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap',
    },
    div: {
        headerClass: 'div min-w-full table',
        tagName: 'div',
        className: 'div text-sm table-cell  text-center flex-1 max-width-xs text-gray-900 font-light md:px-3 md:py-4 px-3 py-2 whitespace-wrap',
    },
}

// This Function loads when HTML page is loaded
window.onload = function () {
    let isClicked = false;
 
    let LStartAppDiv = pvtCreateCustomTagElement('div', 'start-app-div w-[95vw] h-[15%]', null, 'start_application_div');
    let LStartAppBtn = pvtCreateButton('btn font-bold bg-blue-300 rounded-sm p-2 m-6', 'start-app-btn', 'Start Application', null, "Click to Start Application");

    // Event handlers for Checking that the application is started only once
    LStartAppBtn.addEventListener('click', () => {
        if (!isClicked) {
            isClicked = true;
            // appends the return Node of the passed Function
            document.body.appendChild(pvtStartApplication());
        } else {
            alert('Application already started');
        }
    });


    LStartAppDiv.appendChild(LStartAppBtn);
    document.body.appendChild(LStartAppDiv);
}

/**
 * This Function generates the Main body of the application
 * @returns {Node} - Containing the functional structure of the application
*  Rather than writing raw HTML, this function generates the HTML Tags along with its attributes and is Nested thoroughly.
 */
function pvtStartApplication() {
    // External Container containing 3 divs i.e. 
    //  Form , Display and JSon Handlers
    let LExternalContainer = pvtCreateCustomTagElement('div', 'flex flex-col flex-wrap min-h-screen relative');

    // Formation of Form container with it's inner Elements
    let LFormContainer = pvtCreateCustomTagElement('div', 'form relative flex flex-1 flex-col w-[90vw]  h-[25%] p-2 self-center justify-center bg-blue-100');
    // Label 1 container
    let LOptionContainer = pvtCreateCustomTagElement('div', 'selectors md:flex-row flex-col flex md:w-[50%] self-center bg-[#8DCBE6] border-b justify-around py-3 my-8');
    let LRadio1Container = pvtCreateCustomTagElement('div', 'p-1 m-1');
    let LRadio1OptionLbl = pvtCreateRadioLabel('Using DIV', 'change', 'option', () => { return pvtGenerateTablesOfType('div'); }, 'div-radio');

    LRadio1Container.appendChild(LRadio1OptionLbl);

    // label 2 container
    let LRadio2Container = pvtCreateCustomTagElement('div', 'p-1 m-1');
    let LRadio2OptionLbl = pvtCreateRadioLabel('Using Table', 'change', 'option', () => { return pvtGenerateTablesOfType('table'); }, 'table-radio');
    LRadio2Container.appendChild(LRadio2OptionLbl);

    LOptionContainer.appendChild(LRadio1Container);
    LOptionContainer.appendChild(LRadio2Container);

    // Input form Container
    let LInputContainer = pvtCreateCustomTagElement('div', 'input-section self-center p-5 md:w-[50%]');
    let LFormElement = pvtCreateCustomTagElement('form', 'flex-col align-middle md:flex flex-1 md:flex-row justify-center w-auto', null, null, 'submit', pvtAddUser);
    // Input form 
    let LFirstNameInput = pvtCreateInputElement('text', 'First Name', 'first_name', true, "m-1");
    let LLastNameInput = pvtCreateInputElement('text', 'Last Name', 'last_name', true, 'm-1');
    let LSubmitDataBtn = pvtCreateButton('btn bg-blue-300 rounded-sm p-2 m-6 text-nowrap font-bold', 'add-user-btn', 'ADD USER', null, 'Click to add user');

    LFormElement.appendChild(LFirstNameInput);
    LFormElement.appendChild(LLastNameInput);
    LFormElement.appendChild(LSubmitDataBtn);

    LInputContainer.appendChild(LFormElement);

    LFormContainer.appendChild(LOptionContainer);
    LFormContainer.appendChild(LInputContainer);


    // Display Area Container
    LShowDiv = pvtCreateCustomTagElement('div', "flex relative flex-1 md:flex-row flex-col md:w-[95vw] h-[35vh] ", null, 'displayer')

    // Table Display Area Container
    let LTableContainer = pvtCreateCustomTagElement('div', 'table-section justify-center md:w-[45vw] w-[95vw]  h-[100%] flex flex-1 flex-col');

    let LTitle = pvtCreateCustomTagElement('div', 'p-1 m-2 font-bold bg-[#8DCBE6]', 'User List');
    let LDisplayArea = pvtCreateCustomTagElement('div', 'data-display bg-gray-300 h-60 overflow-auto m-2', null, 'data-display-area');

    LTableContainer.appendChild(LTitle);
    LTableContainer.appendChild(LDisplayArea);
    LShowDiv.appendChild(LTableContainer);

    // Json Display Area Container
    LTableContainer = pvtCreateCustomTagElement('div', 'table-section justify-center md:w-[45vw] w-[95vw]  h-[80%] flex flex-1 flex-col');
    LTitle = pvtCreateCustomTagElement('div', 'p-1 m-2 font-bold bg-[#8DCBE6] ', 'JSON');
    let LJsonTextArea = pvtCreateTextBoxElement();
    LTableContainer.appendChild(LTitle);
    LTableContainer.appendChild(LJsonTextArea);
    LShowDiv.appendChild(LTableContainer);

    // JSON Handler  Container
    let LGenerateJsonDiv = pvtCreateCustomTagElement('div', 'flex relative justify-center item-center flex-1 md:h-[10%] bg-grey-100  lg:h-[25%] md:flex-row flex-col generate-json items-center  rounded-sm p-1 m-6');

    let LGenerateJSONBtn = pvtCreateButton('generate-json h-min btn bg-blue-300 font-bold rounded-sm p-2 m-6 text-nowrap', 'generate-json-btn', 'Generate JSON', pvtGenerateJSON, "Generate JSON");
    let LAddNewJsonDataBtn = pvtCreateButton('generate-json h-min w-max btn bg-blue-300 font-bold rounded-sm p-2 m-6 text-nowrap', 'json-data-add', 'Updata Data', pvtUpdataObjectData, "Update Object");

    LGenerateJsonDiv.appendChild(LGenerateJSONBtn);
    LGenerateJsonDiv.appendChild(LAddNewJsonDataBtn);

    LExternalContainer.appendChild(LFormContainer)
    LExternalContainer.appendChild(LShowDiv)
    LExternalContainer.appendChild(LGenerateJsonDiv);

    return LExternalContainer;
}

/**
 * 
 * @param {event} - To prevent it's default behavior 
 * 
 * Checks the input data and adds the data to the Object
 * It calls displayer function
 */
function pvtAddUser(event) {

    event.preventDefault();
    // Updated Input Data
    let LFirstNameInput = document.getElementById('first_name');
    let LLastNameInput = document.getElementById('last_name');

    let LIsRadioSelected = pvtCheckSelection();
    // Checks for Proper Data Input
    if (LIsRadioSelected && pvtValidateInputString(LFirstNameInput.value.trim()) && pvtValidateInputString(LLastNameInput.value.trim())) {

        // Array to give as input to the object
        // It is ensured that data is in proper format
        let LDataArr = [];
        LDataArr.push(LFirstNameInput.value.trim());
        LDataArr.push(LLastNameInput.value.trim());
        GDataObj.UserData.push({ data: LDataArr });

        // Display the Data
        pvtDisplayDataInDiv();

    }
    // If The Radio is not selected then this case is entered
    else if (!LIsRadioSelected) {
        alert('select an option to display data')
    }
    // Testing for Edge cases
    else {
        alert('Please enter valid data');
    }
    // Clearing the present values
    LFirstNameInput.value = ''
    LLastNameInput.value = ''
}

/* Adders and Removers */

// Deletes the data from the object and updates the table
function pvtRemoveRow() {
    // event.preventDefault();
    let LChoice = confirm('Do you want to delete?');
    if (LChoice) {
        let LEventClassList = event.target;
        // checking for the proper target
        if (LEventClassList.classList.contains('delete')) {
            let child = LEventClassList.parentElement.parentElement;
            let parent = child.parentNode;
            let index = pvtGetIndexOfSelectedItem(parent, child)
            // deleting the data from the Object
            GDataObj.UserData.splice(index, 1);
            // display the data
            pvtDisplayDataInDiv()
        } else {
            alert('Delete Not Found!')
        }
    } else {
        // edge case
        console.error('not deleted');
    }

}

//Based on the selection this function calls the appropriate displayer function 
function pvtDisplayDataInDiv() {
    // getting current selection
    const LDivRadioBtn = document.getElementById('div-radio');
    const LTableRadioBtn = document.getElementById('table-radio');

    if (LDivRadioBtn.checked) {
        pvtGenerateTablesOfType('div');
    } else if (LTableRadioBtn.checked) {
        pvtGenerateTablesOfType('table');
    }
}

/*****************************************  Generators */

/**
 * 
 * @param {String} p_strType - Type of Table to generate 
 * Displays the Tables in the Display Area
 */
function pvtGenerateTablesOfType(p_strType) {
    // Creates Custom Tags for the Different Types of Tables
    let LDataHeadElement = pvtCreateCustomTagElement(p_strType, GDataObj[p_strType].headerClass);
    // Child Container
    let LTableChildContainer;

    // This parts calls function to create the header for Div Tables and also assign the complete table to it as We dont have 
    // to create any inner elements for the div tables
    if (p_strType === 'div') {
        let LGeneratedHeadRow = pvtCreateHeadCellIfNeeded('div', 'bg-white table-row border-b flex justify-around', 'div')
        LDataHeadElement.appendChild(LGeneratedHeadRow);
        LTableChildContainer = LDataHeadElement;
    }
    // As we need TBody extra element for the table we assign it to LTableChildContainer
    else {
        let LGeneratedHeadRow = pvtCreateHeadCellIfNeeded('thead', 'bg-white border-b', 'th');
        LDataHeadElement.appendChild(LGeneratedHeadRow);
        LTableChildContainer = document.createElement('tbody');
    }

    let LDataObject = GDataObj;
    // Gets the Row data
    let LDataArr = pvtGetAllUserDataInTable(LDataObject, p_strType);
    // Appends the Rows to the tables
    LDataArr.forEach(key => {
        LTableChildContainer.appendChild(key);
    });

    // If its table TBody has to be appended after THead 
    if (p_strType === 'table') {
        LDataHeadElement.appendChild(LTableChildContainer);
    }
    // As such nothing has to be donee with Div's We directly assign the variable again
    else {
        LDataHeadElement = LTableChildContainer;
    }

    // Displays the Table to the Display Area
    pvtAppendDataToArea(LDataHeadElement);
}

function pvtCreateHeadCellIfNeeded(p_strType, p_strClassName, p_strCellType) {
    let LDataHeadElement;
    // Gettingheading data from object
    let LHeadCellClass = GDataObj.heading.headingClass;
    let LHeadingCellNameArr = GDataObj.heading.headingContent;
    LDataHeadElement = pvtCreateCustomTagElement(p_strType, p_strClassName);

    let LTableHeadChildContainer;
    if (p_strType === 'div') {
        LTableHeadChildContainer = LDataHeadElement;
    }
    // As we need TBody extra element for the table we assign it to LTableChildContainer
    else {
        LHeadCellClass += ' border-solid border-2 border-black';
        LTableHeadChildContainer = pvtCreateCustomTagElement('tr');
    }

    LHeadingCellNameArr.forEach(heading => {
        let LTableHeadCell = pvtCreateCustomTagElement(p_strCellType, LHeadCellClass, heading);
        LTableHeadChildContainer.appendChild(LTableHeadCell);
    });

    if (p_strType === 'table') {
        LDataHeadElement.appendChild(LTableHeadChildContainer);
    } else {
        LDataHeadElement = LTableHeadChildContainer;
    }

    // GDataHeadElement.appendChild(LTableHeadRow);
    return LDataHeadElement;

}

/**
 * 
 * @param {Object} p_objData - GDataObj 
 * @param {String} p_strDisplayType - Type of Table to be generated [Table, Div]
 * @returns {Array} LTableBodyElementArr - Array containing all the Data elements
 * This function creates an array containg nodes for both type of tables
 */
function pvtGetAllUserDataInTable(p_objData, p_strDisplayType) {
    // bool toggles the coloring CSS
    let bool = true;
    let LObjectLength = p_objData.UserData.length;
    // Array to store the Elements
    let LTableBodyElementArr = [];
    // traversing through Array
    for (let LObjIndex = 0; LObjIndex < LObjectLength; LObjIndex++) {
        let LTableRowElement;
        // Creating Row according to the input
        if (p_strDisplayType === 'table') {
            LTableRowElement = pvtCreateCustomTagElement('tr', null, null, null, 'click', pvtPromptData);
        }
        else if (p_strDisplayType === 'div') {
            LTableRowElement = pvtCreateCustomTagElement('div', 'table-row', null, null, 'click', pvtPromptData);
        }

        // Toggling the bg color
        if (bool) {
            LTableRowElement.className += ' bg-[#E3F6FF] border-b';
            bool = false;
        } else {
            LTableRowElement.className += ' bg-[#FFEA20] border-b';
            bool = true;
        }

        let LDataArr = p_objData.UserData[LObjIndex].data;
        let LTraverse = p_objData[p_strDisplayType];
        // Adding Number
        let LTableData = pvtCreateDataRowElement(LTraverse.tagName, LTraverse.className, String(LObjIndex + 1));
        LTableRowElement.appendChild(LTableData)

        // Traversing the array Object
        for (let LDataIndex = 0; LDataIndex < GINPUT_DATA_ROW; LDataIndex++) {
            // checking for proper data From the JSON 
            if (pvtValidateInputString(LDataArr[LDataIndex].trim()) && pvtCheckForJsonError(LDataArr)) {
                LTableData = pvtCreateDataRowElement(LTraverse.tagName, LTraverse.className, LDataArr[LDataIndex]);
                LTableRowElement.appendChild(LTableData);
            } else {
                return Error();
            }
        }
        // Attaching Anchor Tag
        LTableData = pvtCreateDataRowElement(LTraverse.tagName, LTraverse.className, p_objData.anchor);

        LTableRowElement.appendChild(LTableData);
        // Adding Final Row to the Array
        LTableBodyElementArr.push(LTableRowElement);
    }
    return LTableBodyElementArr;
}


/**
 * @returns {void} - generates and applies the JSON
 */
function pvtGenerateJSON() {
    let LDataObject = GDataObj;
    let LJsonString = JSON.stringify(LDataObject, null, 2);
    let LJsonArea = document.getElementById('json-text-display');

    LJsonArea.value = "";
    LJsonArea.value = LJsonString;
}

// Eventer handler for Update JSON button 
// Confirms and Updates the JSON and call function to update Tables in Dispaly Area
function pvtUpdataObjectData() {
    let LConfirm = confirm('Are you sure you want to Update? The saved data may be lost.')
    if (LConfirm) {
        // making copy of object for Error handling
        let LDataObject = GDataObj;
        try {
            let LJsonArea = document.getElementById('json-text-display').value;
            if (pvtIsJSONString(LJsonArea)) {
                let LUpdatedObj = JSON.parse(LJsonArea);
                GDataObj = LUpdatedObj;
                // updating display table
                pvtDisplayDataInDiv();
            } else {
                alert("An error occurred while processing the JSON data.");
            }
        } catch (e) {
            GDataObj = LDataObject;
            pvtDisplayDataInDiv();
            alert("Invalid JSON format. Please enter a valid JSON string. ");
        }
    } else {
        return;
    }

}


/**
 * 
 * @param {String} p_varTagName 
 * @param {String} p_strClassName 
 * @param {String} p_varInnerHTML 
 * @returns {LElement} 
 * This function is called generating the Element for the cells 
 */
function pvtCreateDataRowElement(p_varTagName, p_strClassName, p_varInnerHTML) {
    if (p_varTagName && p_varInnerHTML && p_strClassName) {

        let LElement = document.createElement(p_varTagName);
        LElement.className = p_strClassName;

        if (p_varInnerHTML.includes('delete')) {
            LElement.classList.add('delete-button');
        }

        LElement.innerHTML = p_varInnerHTML;
        return LElement;
    } else return Error('Improper Data Inputted');
}

/** **********************    Validators ************************/

/**
 * @returns {boolean} - checks if atleast one of the radio button is selected or not
 */
function pvtCheckSelection() {
    const LDivRadioBtn = document.getElementById('div-radio');
    const LTableRadioBtn = document.getElementById('table-radio');
    if (LDivRadioBtn.checked || LTableRadioBtn.checked)
        return true
    else
        return false;
}

/**
 * 
 * @param {String} - Checks if the inputted String is valid for the Data or not 
 */
function pvtValidateInputString(p_strInputName) {
    // REGEX that accepts only String that may start with lowercase or uppercase letter
    // and after that only lowercase letters of length between 1 to 15 [exluding both] 
    const regex = /^[A-Za-z][a-z]{1,18}$/;

    if (regex.test(p_strInputName)) {
        return true;
    } else
        return false;
}

// checks the validity of the JSON String
function pvtIsJSONString(p_StrJson) {
    try {
        JSON.parse(p_StrJson);
        return true;
    } catch (e) {
        return false;
    }
}

// checks if the User has added extra inputs to Data Array
let pvtCheckForJsonError = (p_arrDataArr) => {
    if (p_arrDataArr.length > 0) {
        return p_arrDataArr.length == GINPUT_DATA_ROW;
    }
}

/**
 * 
 * @param {Node} p_varHeading - The Element that is to be attached to the Display Area
 */
function pvtAppendDataToArea(p_varHeading) {
    let LArea = document.getElementById('data-display-area');
    LArea.innerHTML = '';
    LArea.appendChild(p_varHeading);
}

// Function to prompt the data 
// It is handler event function for that rows
function pvtPromptData() {
    event.preventDefault();
    let LTarget = event.target;
    if (!LTarget.classList.contains('delete')) {
        let child = LTarget.parentElement;
        let parent = child.parentNode;
        let LIndex = pvtGetIndexOfSelectedItem(parent, child);
        // Alert The String Template
        alert(`Full Name : ${GDataObj.UserData[LIndex].data[0]}  ${GDataObj.UserData[LIndex].data[1]}`);
    } else {
        console.error('error prompting the Full Name');
    }
}

/*********************** Helper */

/**
 * 
 * @param {Node} p_varParent - Parent Element
 * @param {Node} p_varChild - Child Element
 * @returns {Integer} - Index of the selected item
 */
function pvtGetIndexOfSelectedItem(p_varParent, p_varChild) {
    /**
     * {Array.prototype.indexOf.call} methods finds the index of the selected item
     * from the all the items that are inside the parent element
     */
    let LIndex = Array.prototype.indexOf.call(p_varParent.children, p_varChild);
    // Because the Div Type Table contains one extra row (Headers) That is why reducing the index by 1 before returning 
    if (p_varParent.classList.contains('div')) {
        LIndex -= 1;
    }
    return LIndex;
}

// ************************* Helper Functions to create Elements of the HTML page

/**
 * 
 * @param {String} p_StrTagName - Type of Element to create
 * @param {String} p_strClassName - Not required 
 * @param {String} p_strTextContent - Not required
 * @param {String} p_strId - ID - Not required
 * @param {Event} p_evtType - Type of event to be handled
 * @param {Function} p_fnEventHandler - Function to be called when event occurs
 * @returns 
 */
function pvtCreateCustomTagElement(p_StrTagName, p_strClassName = null, p_strTextContent = null, p_strId = null, p_evtType = null, p_fnEventHandler = null) {
    let LElement = document.createElement(p_StrTagName);
    LElement.textContent = p_strTextContent;
    LElement.id = p_strId;
    LElement.addEventListener(p_evtType, p_fnEventHandler);
    LElement.className = p_strClassName;
    return LElement;
}

/**
 * 
 * @returns {Node} Element consisting of the Text Area
 */
function pvtCreateTextBoxElement() {
    let className = "block p-2.5 m-2 md:w-[45vw] w-[95vw] h-60   text-xs overflow-auto text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    let LTextAreaElement = document.createElement('textarea');
    LTextAreaElement.className = className;
    LTextAreaElement.rows = 10;
    LTextAreaElement.id = 'json-text-display';
    return LTextAreaElement;
}

/**
 * 
 * @param {String} p_strClassName - class name of the Button 
 * @param {String} p_strId - Id of the button
 * @param {String} p_StrTextContent - Text content 
 * @param {Function} p_evtHandlerFunction - Function called when eventt occurs
 * @param {String} p_StrTitle - Title of the button
 * @returns {LButtonEl} Button Element
 */
function pvtCreateButton(p_strClassName, p_strId, p_StrTextContent, p_evtHandlerFunction, p_StrTitle) {
    let LButtonEl = document.createElement('button');
    LButtonEl.className = p_strClassName;
    LButtonEl.id = p_strId;
    LButtonEl.title = p_StrTitle;
    LButtonEl.addEventListener('click', p_evtHandlerFunction);
    LButtonEl.textContent = p_StrTextContent;
    return LButtonEl;
}

/**
 * 
 * @param {String} p_StrTextContent  
 * @param {String} p_strEventType 
 * @param {String} p_strName 
 * @param {Function} p_evtHandlerFunction 
 * @param {String} p_strId 
 * @returns {LLabelEl}
 */
function pvtCreateRadioLabel(p_StrTextContent, p_strEventType, p_strName, p_evtHandlerFunction, p_strId) {
    let LLabelEl = document.createElement('label');
    LLabelEl.className = 'cursor-pointer font-bold p-2'
    let LInputEl = pvtCreateInputElement('radio', null, p_strId, true);
    LInputEl.addEventListener(p_strEventType, p_evtHandlerFunction);
    LLabelEl.title = p_StrTextContent;
    LInputEl.name = p_strName;
    LInputEl.className = 'm-2 p-2 cursor-pointer'
    LLabelEl.appendChild(LInputEl);
    LLabelEl.appendChild(document.createTextNode(p_StrTextContent));
    return LLabelEl;
}

/**
 * 
 * @param {String} p_strType 
 * @param {String} p_StrPlaceholder 
 * @param {String} p_strId 
 * @param {Boolean} p_boolIsRequired 
 * @param {String} p_strClassName 
 * @returns 
 */
function pvtCreateInputElement(p_strType, p_StrPlaceholder, p_strId, p_boolIsRequired, p_strClassName) {
    let input = document.createElement('input');
    input.type = p_strType;
    input.className = p_strClassName;
    if (p_StrPlaceholder) input.placeholder = p_StrPlaceholder;
    if (p_strId) input.id = p_strId;
    if (p_boolIsRequired) input.required = p_boolIsRequired;
    return input;
}
