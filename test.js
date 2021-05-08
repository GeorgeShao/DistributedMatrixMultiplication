exports.multiply = function(a, b){
    // Step 1: Format Input
    var b_formatted = []
    for (var i = 0; i < b[0].length; i++){
        temp_b = []
        for (var j = 0; j < b.length; j++){
            temp_b.push(b[j][i])
        }
        b_formatted.push(temp_b)
    }

    // Step 2: Calculate
    sums = []

    for (var h = 0; h < b_formatted.length; h++){
        for (var i = 0; i < a.length; i++){
            sum = 0
            for (var j = 0; j < a[0].length; j++){
                sum += a[i][j] * b_formatted[h][j]
            }
            sums.push(sum)
        }
    }

    // Step 3: Format Output
    num_columns = b_formatted.length
    var result = Array.from(Array(num_columns), () => new Array((sums.length/num_columns)))
    
    row_iter = 0

    for (var h = 0; h < sums.length; h += num_columns){
        for (var j = 0; j < b_formatted.length; j++){
            result[j][row_iter] = sums[j+h]
        }
        row_iter += 1
    }

    // Step 4: Return Output
    return result
};