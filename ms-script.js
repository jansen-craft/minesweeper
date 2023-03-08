let rows = document.getElementById("rows");
let button = document.getElementById("reset");

let height = 14;
let width = 20;

let board = Array.from(Array(width), () => new Array(height))

button.addEventListener("click", buildBoard(height, width));

window.addEventListener("click", revealCell);
window.addEventListener("contextmenu", flagCell);

function buildBoard(h, w) {
    board = generateBoard(height, width, 45);
    for (let i = 0; i < w; i++) {
        let ul = document.createElement('ul');
        ul.style.float = "left";
        rows.append(ul)

        for (let j = 0; j < h; j++) {
            let li = document.createElement('li');
            li.id = `li${i}:${j}`;
            li.innerHTML = fetchHTML(board[j][i]);
            li.classList.add('cell');
            li.classList.add('cell-covered');
            ul.append(li);
        }
    }
}

function generateBoard(rows, cols, numBombs) {
    const board = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
  
    let bombsPlaced = 0;
    while (bombsPlaced < numBombs) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (board[row][col] !== -1) {
        board[row][col] = -1; // -1 indicates a bomb
        bombsPlaced++;
      }
    }
  
    // Fill in the numbers for non-bomb cells
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (board[row][col] === -1) continue; // Skip bombs
        let count = 0;
        for (let i = row - 1; i <= row + 1; i++) {
          for (let j = col - 1; j <= col + 1; j++) {
            if (i < 0 || i >= rows || j < 0 || j >= cols) continue; // Skip cells outside the board
            if (board[i][j] === -1) count++; // Count adjacent bombs
          }
        }
        board[row][col] = count; // Set the cell value to the count
      }
    }
  
    return board;
  }
  

function revealCell(event) {
    let x = event.clientX;
    let y = event.clientY;
    let t_x = Math.floor((x - 254) / 48);
    let t_y = Math.floor((y - 64) / 48);
    console.log(`${x}: ${y}`);
    console.log(`${t_x}: ${t_y}`);
    if(t_x >= 0 && t_x < width && t_y >= 0 && t_y < height){
        let element = document.getElementById(`li${t_x}:${t_y}`);
        if(!(element.innerHTML === '⚑')){
            element.style.color = 'black';
            element.style.color = fetchColor(board[t_y][t_x]);
            element.innerHTML = fetchHTML(board[t_y][t_x]);
            element.classList.remove('cell-covered');
            element.classList.add('cell-clear');
            if(element.innerHTML === '💣'){
                setTimeout(() => {
                    alert("ok u lit");
                    window.location.reload();
                }, 250);
            }
            if(element.innerHTML === ''){
                console.log("banana");
            }
        }
    }
}

function flagCell(event) {
    let x = event.clientX;
    let y = event.clientY;
    let t_x = Math.floor((x - 254) / 48);
    let t_y = Math.floor((y -64) / 48);

    if(t_x >= 0 && t_x < width && t_y >= 0 && t_y < height){
        let element = document.getElementById(`li${t_x}:${t_y}`);
        if(element.innerHTML === '⚑'){
            element.innerHTML = fetchHTML(board[t_y][t_x]);
            element.style.color = 'transparent';
        } else if (!element.classList.contains("cell-clear")){
            element.innerHTML = '⚑';
            element.style.color = "red";
        }
    }
}

function fetchColor(number){
    if(number === 1){
        return 'blue';
    } else if(number === 2){
        return 'green';
    } else if(number === 3){
        return 'red';
    } else if(number === 4){
        return 'purple';
    } else if(number === 5){
        return 'darkred';
    } else if(number === 6){
        return 'teal';
    } else if(number === 0){
        return 'black';
    }
}

function fetchHTML(number){
    if(number === 0){
        return '';
    } else if(number === -1){
        return '&#128163';
    } else {
        return number;
    }
}
