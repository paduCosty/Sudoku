let tableCopy = [];
for(let i = 0; i < 9; ++i) {
    tableCopy[i] = new Array(9);
}

function startGame() {
    let sudokuTable = document.getElementById("sudokuTable");
    let matrix = finalTable();
    let pozitionButon = 0, lengthButton = 9;
    for(let tableLine = 0; tableLine < 9; ++tableLine) {
        for(let tableColumns = pozitionButon; tableColumns < lengthButton; ++tableColumns) {
            sudokuTable.innerHTML += '<div class = "garage-title" id = '+ tableLine + tableColumns +
            ' onclick = "tableSudoku(' +  tableLine +', '+ tableColumns +')">  </div>'; 
            sudokuTable.innerHTML += " ";
            document.getElementById('' + tableLine + tableColumns).innerHTML = matrix[tableLine][tableColumns];
            //color Minitable
            tableCopy[tableLine][tableColumns] = matrix[tableLine][tableColumns];   
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
    //console
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
    sudokuUser.innerHTML += "<br>";
    sudokuUser.innerHTML += "<br>";
}

function orderedMatrix() {
    let matrix = [];
    for(let i = 0; i < 9; ++i) {
        matrix[i] = new Array(9);
    }
    let index = 0, firtsNumber = -1;
    for(let i = 0; i < 9; ++i) {
        for(let j = 0; j < 9; ++j) {
            matrix[i][j + index] = j + 1;
            if(j + index > 7) {
                matrix[i][j + index - 9] = j + index - firtsNumber;
            }
        }
        if(i == 2) {
            index = -2;
            firtsNumber = -3;
        }
        if(i == 5) {
            index = -1;
            firtsNumber = -2;
        }
        index += 3;
        firtsNumber += 3;
    }
    return matrix;
}

let finalTableCopy = [];

function matchMatrixRandom() {
    let matrix =  orderedMatrix();
    let table = [];
    for(let i = 0; i < 9; ++i) {
        table[i] = new Array(9);
        finalTableCopy[i] = new Array(9);
    }
    let listLine = [], listColumn = [];
    shuffle(listLine);
    shuffle(listColumn);
    for(let i = 0; i < 9; ++i) {
        for(let j = 0; j < 9; ++j) {
            table[i][j] = matrix[listLine[i]][listColumn[j]];
            finalTableCopy[i][j] = table[i][j];
        }
    }
    return table;
}


function shuffle(array) {
    let arrMini1 = [], arrMini2 = [], arrMini3 = [];
    for(let i = 0; i < 3; ++i) {
        arrMini1[i] = i;
        arrMini2[i] = i + 3;
        arrMini3[i] = i + 6;
    }
    arrMini1.sort(() => Math.random() - 0.5);
    arrMini2.sort(() => Math.random() - 0.5);
    arrMini3.sort(() => Math.random() - 0.5);
    for(let i = 0, index = 0; i < 9; ++i) {
        if(i < 3) {
            array[i] = arrMini1[index];
        } else if(i > 2 && i < 6) {
             array[i] = arrMini2[index];
        } else if(i > 5 && i < 9) {
             array[i] = arrMini3[index];
        }
        ++index;
        if(i == 2 || i == 5) {
            index = 0;
        }
    }
}

function finalTable() {
    let table = matchMatrixRandom();
    for(let i = 0; i < 9; ++i) {
        for(let j = 0; j < 9; ++j) {
            let b = Math.floor(Math.random() * 3); 
            if(b == 0) {
                table[i][j] = ""; 
                table[j][i] = "";
            }
        }
    }
    return table;
} 

let index = 0;
function tableSudoku(tableLine, tableColumns) {
    let endGame = 0;
    endGame = checkTable(endGame);
    console.log(endGame);
    if(tableCopy[tableLine][tableColumns] == "" && index != " " && endGame <= 81) {
        document.getElementById('' + tableLine + tableColumns).innerHTML = index;
        document.getElementById('' + tableLine + tableColumns).style.color = "green";
    }
    index = " ";
    if(endGame == 81) {
        restartGame = document.getElementById("endGame");
        restartGame.innerHTML = '<div class = "restartGame" onclick = "restartPage()"> &#128472; </div>'
        document.getElementById("TheEnd").innerHTML = "The End";
    }
    let check = gameCheck();
    if(check == 81 && endGame < 81) {
        document.getElementById("TheEnd").innerHTML = "The table does not follow the rule!";
    }
}
function userNumber(arrUser) {
    index = document.getElementById('' + arrUser).innerHTML;
    if(index == "Delete") {
        index = "";
    }
}

function checkTable(index) {
    let tableCompleted = [];
    for(let i = 0; i < 9; ++i) {
        tableCompleted[i] = new Array(9);
    } 
    for(let i = 0; i < 9; ++i) {
        for(let j = 0; j < 9; ++j) {
            tableCompleted[i][j] = document.getElementById('' + i + j).innerHTML;
        }
    }
    for(let i = 0; i < 9; ++i) {
        for(let j = 0; j < 9; ++j) {
            if(tableCompleted[i][j] == finalTableCopy[i][j]) {
                ++index;
            }
        }
    }
    return index;
} 

function restartPage() {
    location.reload();
}

function gameCheck() {
    matirx = [], check = 0;
    for(let i = 0; i < 9; ++i) {
        matirx[i] = new Array(9);
    }
    for(let i = 0; i < 9; ++i) {
        for(let j = 0; j < 9; ++j) {
            matirx[i][j] = document.getElementById('' + i + j).innerHTML;
            if(matirx[i][j] != "") {
                ++check;
            }
        }
    }
    return check;
}
