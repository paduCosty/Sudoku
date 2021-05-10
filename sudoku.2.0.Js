function startGame() {
    let tableMatrix = [], table = [];
    for(let i = 0; i <= 9; i++) {
        tableMatrix[i] = new Array(9);
        table[i] = new Array(9);
    }
    let indexLine = 0, indexColumn = 0, stopper = true, br = 0;
    while(stopper== true) {
        let random = Math.floor(Math.random() * 9) + 1;
        tableMatrix[indexLine][indexColumn] = lineSearch(tableMatrix, random, indexLine, indexColumn);
       //console.log(br);
       ++br;
        if(indexColumn == 8 && tableMatrix[indexLine][indexColumn] != 0) {
            ++indexLine;
            indexColumn = -1;
        }
        if(indexLine == 8) {
            stopper = false;
        }
        if(tableMatrix[indexLine][indexColumn] != 0) {
            ++indexColumn;
        }
    }
    //table = duplicatedRemoveLine(tableMatrix);
    //table = duplicareColumnRemove(tableMatrix);
    //table = duplicateMiniTable(tableMatrix);
    //<<<design table>>>\\
    let sudokuTable = document.getElementById("sudokuTable");
    let pozitionButon = 0, lengthButton = 9;
    for(let tableLine = 0; tableLine < 9; ++tableLine) {
        for(let tableColumns = pozitionButon; tableColumns < lengthButton; ++tableColumns) {
            sudokuTable.innerHTML += '<div class = "garage-title" id = '+ tableLine + tableColumns +
            ' onclick = "tableSudoku(' +  tableLine +', '+ tableColumns +')">  </div>'; 
            sudokuTable.innerHTML += " ";
            document.getElementById('' + tableLine + tableColumns).innerHTML = tableMatrix[tableLine][tableColumns];
            //color Minitable
            if(tableLine < 3 && tableColumns < 3) {
                document.getElementById('' + tableLine + tableColumns).style.borderColor = "green";
            } else if(tableLine < 3 && tableColumns > 5 && tableColumns < 9) {
                document.getElementById('' + tableLine + tableColumns).style.borderColor = "green";
            } else if(tableLine > 2 && tableLine < 6 && tableColumns > 2 && tableColumns < 6) {
                document.getElementById('' + tableLine + tableColumns).style.borderColor = "green";
            } else if(tableLine > 5 && tableLine < 9 && tableColumns < 3) {
                document.getElementById('' + tableLine + tableColumns).style.borderColor = "green";
            } else if(tableLine > 5 && tableLine < 9 && tableColumns > 5 && tableColumns < 9) {
                document.getElementById('' + tableLine + tableColumns).style.borderColor = "green";
            } else {
                document.getElementById('' + tableLine + tableColumns).style.borderColor = "brown";
            }
            document.getElementById('' + tableLine + tableColumns).style.color = "brown";
        }
        sudokuTable.innerHTML += "<br>";
    }
    //sudokuTable.innerHTML += "<br>";
    let sudokuUser = document.getElementById('sudokuUser');
    for(let arrUser = 0; arrUser < 10; ++arrUser) {
        sudokuUser.innerHTML += '<button class = "consoleUser" id = '+ arrUser + ' onclick = "userNumber(' +  arrUser +')">  </button>'; 
        sudokuUser.innerHTML += " ";
        if(arrUser < 9) {
            document.getElementById('' + arrUser).innerHTML = arrUser + 1;
        } else {
            document.getElementById(arrUser).innerHTML = "Delete";
        }
    }
}
function lineSearch(tableMatrix, random, indexline, indexColumn) {
    //line
    let stop = 0;
    for(let i = indexline, j = 0; j < 9; ++j) {
        if(tableMatrix[i][j] == random) {
            stop = 1;
        }
    }
    ///column
    let stopColumn = 0;
    for(let i = indexline; i >= 0; --i) {
        if(tableMatrix[i][indexColumn] == random) {
            stopColumn = 1;
        }
    }
    if( stop == 0 && stopColumn == 0) {
        tableMatrix[indexline][indexColumn] = random
    } else {
        tableMatrix[indexline][indexColumn] = 0;
    }
    return tableMatrix[indexline][indexColumn];
}
