/**
 * Created by lcf on 2015/1/21.
 */
function processData(input) {
    input = input.trim();
    var inputRows = input.split("\n");
    var count = inputRows[0];
    var inputArray = splitArray(inputRows, count);
    var result = countChocolate(inputArray);
    result.forEach(function (data) {
        console.log(data);
    })
}
function countChocolate(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        var total = Math.floor(arr[i][0] / arr[i][1]);
        var temp = total;
        var prev = 0;
        var m = arr[i][2];
        while (temp >= m) {
            prev = temp % m;
            temp = Math.floor(temp / m);
            total += temp;
            temp += prev;
        }
        result.push(total);
    }
    return result;
}
function splitArray(arr, count) {
    var data = [];
    for (var j = 0; j < count; j++) {
        data.push(arr[j +1].split(' '));
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
