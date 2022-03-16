const data: string[][] = 
[['A', 'O', 'T', 'D', 'L', 'R', 'O', 'W'],
['L', 'C', 'B', 'M', 'U', 'M', 'L', 'U'],
['D', 'R', 'U', 'J', 'D', 'B', 'L', 'J'],
['P', 'A', 'Z', 'H', 'Z', 'Z', 'E', 'F'],
['B', 'C', 'Z', 'E', 'L', 'F', 'H', 'W'],
['R', 'K', 'U', 'L', 'V', 'P', 'P', 'G'],
['A', 'L', 'B', 'L', 'P', 'O', 'P', 'Q'],
['B', 'E', 'M', 'O', 'P', 'P', 'J', 'Y']]

function letterColumn(fn: (letter_idx:number,
     matrix=data)
     => string[]) {
    return matrix.map(row => row[letter_idx]);
}

function aboveOrBelowLetter(
    letterIdx:number,
    above=true,
    matrix=data) {
    const col: string[] = letterColumn(letterIdx);

    if (above) 
        return col.slice(0,letterIdx);
    
    return col.slice(letterIdx, matrix.length);
}

function checkSurroundingWords(fn: (row: string[], letterIdx: number, word: string) => boolean)  {

}
