window.onload = function () {
    let isClicked = false;
    let LStartAppDiv = document.createElement('div');
    LStartAppDiv.className = 'start-app-div w-[95vw] ';
    LStartAppDiv.id = 'start_application_div';

    let LStartAppBtn = document.createElement('button');
    LStartAppBtn.className = 'btn bg-blue-300 rounded-sm p-1 m-6';
    LStartAppBtn.id = 'start-app-btn';
    LStartAppBtn.textContent = 'Start Application';
    LStartAppBtn.type = 'button';
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
    let LExternalContainer = document.createElement('div');
    LExternalContainer.className = 'container flex  flex-col flex-wrap width-screen';

    let LFormContainer = document.createElement('div');
    LFormContainer.className = 'form flex flex-1 flex-col w-[90vw] p-2 self-center bg-blue-100 ';

    let LOptionContainer = document.createElement('div');
    LOptionContainer.className = 'selectors md:flex-row flex-col flex md:w-[50%] self-center bg-blue-300 justify-around py-3 my-8';

    // using div
    let LRadio1Container = document.createElement('div');
    LRadio1Container.className = 'p-1';

    let LRadio1OptionLbl = document.createElement('label');
    let LRadio1Input = document.createElement('input');
    LRadio1Input.type = 'radio';
    LRadio1Input.name = 'option';
    LRadio1Input.addEventListener('change', pvtgenerateDivContent);
    LRadio1Input.title = 'Using DIV';
    LRadio1OptionLbl.appendChild(LRadio1Input);
    LRadio1OptionLbl.appendChild(document.createTextNode('Using DIV'));

    LRadio1Container.appendChild(LRadio1OptionLbl)

    // using table
    let LRadio2Container = document.createElement('div');
    LRadio2Container.className = 'p-1';

    let LRadio2OptionLbl = document.createElement('label');
    let LRadio2Input = document.createElement('input');
    LRadio2Input.type = 'radio';
    LRadio2Input.name = 'option';
    LRadio2Input.addEventListener('change', () => {
        let area = document.getElementById('data-display-area');
        area.innerHTML = '';
        area.appendChild(pvtGenerateTable())
    });
    LRadio2Input.title = 'Using Table';
    LRadio2OptionLbl.appendChild(LRadio2Input);
    LRadio2OptionLbl.appendChild(document.createTextNode('Using Table'));

    LRadio2Container.appendChild(LRadio2OptionLbl)

    // appending in options label
    LOptionContainer.appendChild(LRadio1Container);
    LOptionContainer.appendChild(LRadio2Container);

    // input form
    let LInputContainer = document.createElement('div');
    LInputContainer.className = 'input-section self-center p-5 md:w-[50%] ';

    let LFormElement = document.createElement('form');

    let LFirstNameInput = document.createElement('input');
    LFirstNameInput.className = 'first-name m-5';
    LFirstNameInput.type = 'text';
    LFirstNameInput.placeholder = 'First Name';
    LFirstNameInput.id = 'first_name';
    LFirstNameInput.required = true;

    let LLastNameInput = document.createElement('input');
    LLastNameInput.className = 'last-name m-5';
    LLastNameInput.type = 'text';
    LLastNameInput.placeholder = 'Last Name';
    LLastNameInput.id = 'last_name';
    LLastNameInput.required = true;

    let LSubmitDataBtn = document.createElement('button');
    LSubmitDataBtn.className = 'btn bg-blue-300 rounded-sm p-1 m-6';
    LSubmitDataBtn.id = "add-user-btn";
    LSubmitDataBtn.type = 'submit';
    LSubmitDataBtn.addEventListener('click', pvtAddUser);
    LSubmitDataBtn.textContent = 'ADD USER';

    LFormElement.appendChild(LFirstNameInput);
    LFormElement.appendChild(LLastNameInput);
    LFormElement.appendChild(LSubmitDataBtn);

    LInputContainer.appendChild(LFormElement);

    LFormContainer.appendChild(LOptionContainer);
    LFormContainer.appendChild(LInputContainer);


    // Table container
    let LTableContainer = document.createElement('div');
    LTableContainer.className = 'table-section w-[95vw] flex flex-1 flex-col   ';

    let LTitle = document.createElement('div')
    LTitle.className = 'p-1 m-2 font-bold bg-gray-500';
    LTitle.textContent = 'User List';

    let LDisplayArea = document.createElement('div');
    LDisplayArea.className = 'data-display  bg-gray-300 h-60 overflow-auto m-2';
    LDisplayArea.id = 'data-display-area'

    LTableContainer.appendChild(LTitle);
    LTableContainer.appendChild(LDisplayArea);

    let LGenerateJsonDiv = document.createElement('div');
    LGenerateJsonDiv.className = 'btn generate-json self-end bg-blue-300 rounded-sm p-1 m-6';

    let LGenerateJSONBtn = document.createElement('button');
    LGenerateJSONBtn.textContent = 'Generate JSON';
    LGenerateJSONBtn.type = 'button';
    LGenerateJSONBtn.id = 'generate-json-btn';
    LGenerateJSONBtn.className = 'btn generate-json btn bg-blue-300 rounded-sm p-1 m-6';

    LGenerateJsonDiv.appendChild(LGenerateJSONBtn);

    LExternalContainer.appendChild(LFormContainer)
    LExternalContainer.appendChild(LTableContainer)
    LExternalContainer.appendChild(LGenerateJsonDiv);

    return LExternalContainer;
}


function pvtAddUser() {
    let LFirstNameInput = document.getElementById('first_name');
    let LLastNameInput = document.getElementById('last_name');



    LFirstNameInput.textContent = ''
    LLastNameInput.textContent = ''

}

function pvtGenerateTable() {
    console.log('Generating table');
    let LTableHeadClass = "text-sm font-bold text-gray-900 px-6 py-4 text-left";
    let LTableHeadScope = 'col';
    let LTableHeadingName = ['#', 'First Name', 'Last Name', 'Delete'];

    const LTableElement = document.createElement('table');
    LTableElement.className = "min-w-full";

    LTHeadElement = document.createElement('thead');
    LTHeadElement.className = 'bg-white border-b';

    LTableHeadRow = document.createElement('tr');

    for (let i = 0; i < LTableHeadingName.length; i++) {
        let LTableHeadCell = document.createElement('th');
        LTableHeadCell.className = LTableHeadClass;
        LTableHeadCell.scope = LTableHeadScope;
        LTableHeadCell.textContent = LTableHeadingName[i];
        LTableHeadRow.appendChild(LTableHeadCell);
    }

    LTHeadElement.appendChild(LTableHeadRow);
    LTableElement.appendChild(LTHeadElement);


    let LTableBodyElement = document.createElement('tbody');
    let LDataArr = pvtGetAllUserDataInTable(GDataObj, 'table');
    for (let key of LDataArr) {
        LTableBodyElement.appendChild(key);
    }
    LTableElement.appendChild(LTableBodyElement);

    return LTableElement;
}

function pvtgenerateDivContent() {
    console.log('Div content generated');
}


function pvtGetAllUserDataInTable(p_objData, p_strDisplayType) {
    console.log('Get all user data')
    let bool = true;
    let LTableBodyElementArr = [];
    for (let i = 0; i < p_objData.UserData.length; i++) {
        let LTableRowElement = document.createElement('tr');
        if (bool) {
            LTableRowElement.className = 'bg-gray-100 border-b';
            bool = false;
        } else {
            LTableRowElement.className = 'bg-white border-b';
            bool = true;
        }
        let LDataArr = p_objData.UserData[i]['data'];
        let LTraverse = p_objData.UserData[i][p_strDisplayType].AllElement;
        let LElementIndex = 0;
        for (let index = 0; index < LDataArr.length; index++) {
            if (index == 3) LElementIndex = 1;
            const LTableData = document.createElement(`${LTraverse[LElementIndex].tagName}`);
            LTableData.className = LTraverse[LElementIndex].className;
            LTableData.innerHTML = LDataArr[index];
            LTableRowElement.appendChild(LTableData);
        }
        LTableBodyElementArr.push(LTableRowElement);
    }
    console.log(LTableBodyElementArr[1]);
    return LTableBodyElementArr;
}

const GDataObj = {
    UserData: [
        {
            data: ['1', 'Dipesh', 'Marathe', '<a class="cursor-pointer underline hover:text-blue-100" onclick="pvtDeleteElement()">Delete</a>'],
            table: {
                AllElement: [
                    {
                        tagName: 'td',
                        className: 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'
                    }, {
                        tagName: 'td',
                        className: 'text-sm font-light px-6 py-4 text-blue-900'
                    }
                ]
            },
            div: {
                AllElement: [
                    {
                        tagName: 'td',
                        className: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900',
                        innerHTML: '1'
                    }, {
                        tagName: 'td',
                        className: 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap',
                        innerHTML: 'Dipesh'
                    }, {
                        tagName: 'td',
                        className: 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap',
                        innerHTML: 'Marathe'
                    }, {
                        tagName: 'td',
                        className: 'text-sm font-light px-6 py-4 text-blue-900',
                        innerHTML: '<a class=" cursor-pointer underline hover:text-blue-100 ">Delete</a>'
                    }
                ]
            }

        }, {
            data: ['2', 'Mayur', 'Kumavat', '<a class="cursor-pointer underline hover:text-blue-100" onclick="pvtDeleteElement()">Delete</a>'],
            table: {
                AllElement: [
                    {
                        tagName: 'td',
                        className: 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap',
                    }, {
                        tagName: 'td',
                        className: 'text-sm font-light px-6 py-4 text-blue-900',
                    }
                ]
            },
            div: {
                AllElement: [
                    {
                        tagName: 'td',
                        className: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900',
                        innerHTML: '1'
                    }, {
                        tagName: 'td',
                        className: 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap',
                        innerHTML: 'Dipesh'
                    }, {
                        tagName: 'td',
                        className: 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap',
                        innerHTML: 'Marathe'
                    }, {
                        tagName: 'td',
                        className: 'text-sm font-light px-6 py-4 text-blue-900',
                        innerHTML: '<a class=" cursor-pointer underline hover:text-blue-100 ">Delete</a>'
                    }
                ]
            }

        }],
} 
