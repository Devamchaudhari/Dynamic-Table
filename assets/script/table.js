let organisationDetails = [];
let columnObj = [];
let searchObj = [];
let prevId = '';
let prevOrder = false;  /* false = ascending , true = descending */
fetch("data.json")
    .then(response => response.json())

    .then(function (data1) {

        organisationDetails = data1.data.organizations;
        columnObj = data1.data.columns;
        searchObj = data1.data.sortableColumns;
        headerdata(data1);

        resultData(data1);

        searchInp(data1);

        searchFun();
    
        sortFun(data1);
    });

// Headername data function
function headerdata() {

    let headerRow = document.getElementById("header-row");
    Object.keys(columnObj).forEach(ele => {
        headerRow.innerHTML += `<th>${columnObj[ele]} ${searchObj.includes(ele)?`<button name=${ele} onClick='sortFun("${ele}")'>A-Z</button>`:""}</th>`
    });
}

// Header data function
function searchInp(data1) {
    console.log("search function");
    let searchObj = data1.data.searchableColumns;
    console.log('searchobj :>> ', searchObj);
    let searchObj_cols = data1.data.columns;
    let searchRes = document.getElementById('search-row');
        
        Object.keys(searchObj_cols).forEach((searchCols ,indexOf) => {
            // debugger
         let findval = searchObj.findIndex(searchval => searchval === searchCols);

         if(findval>=0){
             searchRes.innerHTML +=`<td><input type='search' placeholder=${searchCols} id=${searchCols} onkeyup="searchFun(${indexOf},'${searchCols}')"></input></td>`;
         }
         else{
            searchRes.innerHTML +=`<td></td>`;
         }
    })
}

// result data function
function resultData() {
    let rowData = document.getElementById("result");
    rowData.innerHTML = "";

    organisationDetails.forEach(ele => {
        let trfield = '';
        Object.keys(columnObj).forEach(columnKeys => {
            trfield += `<td>${ele[columnKeys]}</td>`

        });
        rowData.innerHTML += `<tr>${trfield}</tr>`
    });
}

// SearchData search function
function searchFun(indexof,id) {
    console.log('debauto id :>> ',id );
    
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById(id);
            filter = input.value.toUpperCase();
            table = document.getElementById("result");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[indexof];
            console.log('td :>> ', td);
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

// Sorting Function
function sortFun(id) {
    if (prevId === id) {
        prevOrder = !prevOrder
    } else {
        prevId = id;
        prevOrder = false;
    }

    organisationDetails = organisationDetails.sort((a, b) => {
        let fa = (a[id] || "").toString().toLowerCase(),
            fb = (b[id] || "").toString().toLowerCase();
        if (!prevOrder) {
            //for ascending
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
        } else {
            //for descending
            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
        }
        return 0;
    });
    resultData();
}