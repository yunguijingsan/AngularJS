/**
 * Created by lcf on 2015/1/21.
 */
function processData(input) {
    input = input.trim();
    var inputRows = input.split("\n");
    var count = inputRows[0];
    var inputArray = splitArray(inputRows, count);
    var result = countSherlockSquare(inputArray);
    result.forEach(function (data) {
        console.log(data);
    })
}
function countSherlockSquare(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        result.push(countSquare(arr[i][0], arr[i][1]));
    }
    return result;
}

function countSquare(a, b) {
    var count = 0;
    for (var i = Math.floor(Math.sqrt(a)); i <= Math.floor(Math.sqrt(b)); i++) {
        var temp = Math.pow(i,2);
        if(temp >= a && temp <= b){
            count++;
        }
    }
    return count;
}

function splitArray(arr, count) {
    var data = [];
    for (var j = 1; j < count; j++) {
        data.push(arr[j].split(' '));
    }
    return data;
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});
