/**
 * Created by lcf on 2015/1/21.
 */
function processData(input) {
    input = input.trim();
    var inputRows = input.split("\n");
    var result = countChocolate(inputRows);
    result.forEach(function (data) {
        console.log(data);
    })
}
function countChocolate(arr) {
    var result = [];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] % 2 == 0) {
            result.push(Math.pow(arr[i] % 2, 2));
        } else {
            if (arr[i] == 1) {
                result.push(0)
            } else {
                result.push(Math.floor(arr[i] / 2), Math.round(arr[i] / 2));
            }
        }
    }
    return result;
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
