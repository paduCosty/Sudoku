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
       console.log(br);
       ++br;
        if(indexColumn == 8 && tableMatrix[indexLine][indexColumn] != 0) {
            ++indexLine;
            indexColumn = -1;
        }
        if(indexLine == 9) {
            stopper = false;
        }
        if(tableMatrix[indexLine][indexColumn] != 0) {
            ++indexColumn;
        }
    }
        
    //<<<>>>\\
    let sudokuTable = document.getElementById("sudokuTable");
    let pozitionButon = 0, lengthButton = 9;
    for(let tableLine = 0; tableLine < 9; ++tableLine) {
        for(let tableColumns = pozitionButon; tableColumns < lengthButton; ++tableColumns) {
            sudokuTable.innerHTML += '<div class = "garage-title" id = '+ tableLine + tableColumns +
            ' onclick = "tableSudoku(' +  tableLine +', '+ tableColumns +')">  </div>'; 
            sudokuTable.innerHTML += " ";
            // trebuie sa fac verificarea pe linii si coloane a numarului introdus
            // 1 am facut verificarea pe linii acum trebuie sa fac pentru coloane si mini tabele
            document.getElementById('' + tableLine + tableColumns).innerHTML = tableMatrix[tableLine][tableColumns];
        }
        sudokuTable.innerHTML += "<br>";
    }
}
//functia pentru setarea numerelor pelinii
function lineSearch(tableMatrix, random, indexline, indexColumn) {
    let stop = 0;
    for(let i = indexline, j = 0; j < 9; ++j) {
       // console.log(tableMatrix[j][indexColumn]);
        if(tableMatrix[i][j] == random) {
            stop = 1;
        }
    }
    let stopColumn = 0;
    for(let i = indexline; i >= 0; --i) {
       // console.log(indexline);
        if(tableMatrix[i][indexColumn] == random) {
            stopColumn = 1;
        }
       // console.log(tableMatrix[i][indexColumn]);
    }
    if( stop == 0 && stopColumn == 0) {
        tableMatrix[indexline][indexColumn] = random
    } else {
        tableMatrix[indexline][indexColumn] = 0;
    }
    return tableMatrix[indexline][indexColumn];
}
//functi apentru setarea numerelor pe coloane
