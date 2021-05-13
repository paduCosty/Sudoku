let table = [], matrix = [], copyTable = []; // cum as fi putut face fara aceste variabile globale?

function startGame() {
    for(let i = 0; i <= 9; i++) {
        matrix[i] = new Array(9);
        table[i] = new Array(9);
        copyTable[i] = new Array(9);
    }
    let index = 0, firtsNumber = -1;

    //Math table with orden number
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

    // random
    let list = [], listColumn = [];
    shuffle(list);
    shuffle(listColumn);
    for(let i = 0; i < 9; ++i) {
        for(let j = 0; j < 9; ++j) {
            table[i][j] = matrix[list[i]][listColumn[j]];
            copyTable[i][j] = table[i][j];
        }
    }

    // delete numar random
    for(let i = 0; i < 9; ++i) {
        for(let j = 0; j < 9; ++j) {
            let b = Math.floor(Math.random() * 3); // cu cat numarul este mai mic cu atat tabelul va avea mai putine numere
            if(b == 0) {
                    table[i][j] = ""; //  daca pui in comnetariu astaea 2 linii jocul va fi completat automat
                    table[j][i] = ""; //  
            }
        }
    }

    //<<<design table>>>\\
    let sudokuTable = document.getElementById("sudokuTable");
    let pozitionButon = 0, lengthButton = 9;
    for(let tableLine = 0; tableLine < 9; ++tableLine) {
        for(let tableColumns = pozitionButon; tableColumns < lengthButton; ++tableColumns) {
            sudokuTable.innerHTML += '<div class = "garage-title" id = '+ tableLine + tableColumns +
            ' onclick = "tableSudoku(' +  tableLine +', '+ tableColumns +')">  </div>'; 
            sudokuTable.innerHTML += " ";
            document.getElementById('' + tableLine + tableColumns).innerHTML = table[tableLine][tableColumns];
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
    let sudokuUser = document.getElementById('sudokuUser');
    //Meniu utilizator
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
let index = ""; // nu stiu cum as fi putut transmite parametri intre "tabeleSudoku" si "userNumber" 
         //am folosit variabila globala index pentru a afla ce numar a apasat in consola utilizatorul

function tableSudoku(tableLine, tableColumns) {
    if(table[tableLine][tableColumns] == "" && index != " ") {
        document.getElementById('' + tableLine + tableColumns).innerHTML = index;
        document.getElementById('' + tableLine + tableColumns).style.color = "green";
    }
    index = " ";
    let endGame = 0;
    endGame = checkTable(endGame);
   // console.log(endGame);
    if(endGame == 81) {
        document.getElementById("endGame").innerHTML = "Tabel complet apasa aici pentru a incepe jocul din nou";
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
            if(tableCompleted[i][j] == copyTable[i][j]) {
                ++index;
            }
        }
    }
    return index;
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
