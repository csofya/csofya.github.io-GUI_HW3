// File: myscript.js
// GUI Assignment: HW3 Creating an Interactive Dynamic Table
//     Create a dynamic table based on an HTML form using JavaScript
// Sofya Chow, Sofya_Chow@student.uml.edu
// Last Updated On: Oct 23, 2021       

// Handles form submission when the submit image is clicked
function submitFunc() {
    // Clear everything due to resubmission of form
    document.getElementById("error_message").innerHTML = "";
    document.getElementById("multiplication_table").innerHTML = "";
    document.getElementById("multiplication_table").style.visibility = "hidden";

    // Get object/values from the form
    var form = document.getElementById("form_id");
    var lower_hor = document.getElementById("lower_horizontal").value;
    var upper_hor = document.getElementById("upper_horizontal").value;
    var lower_ver = document.getElementById("lower_vertical").value;
    var upper_ver = document.getElementById("upper_vertical").value;

    // Check if there is an empty string because an empty string will be translated to 0
    var str_values = [lower_hor, upper_hor, lower_ver, upper_ver]
    for (var i = 0; i < str_values.length; i++) {
        // console.log(str_values[i]);
        if (str_values[i] == '' || str_values[i].includes(".")) {
            console.log("yes");
            str_values[i] = NaN
        }
    }

    // Update the values of input and convert to numerical input to validate
    var values = str_values.map(Number);
    var pass = validateNumber(values);
    if (pass) {
        createTable(+lower_hor, +upper_hor, +lower_ver, +upper_ver)
    }
    else {
        document.getElementById("form_id").reset();
        return false;
    }

    // Since the div is orginally hidden before user input, change visibility
    document.getElementById("multiplication_table").style.visibility = "visible";
    document.getElementById("form_id").reset();

    // return statement to not refresh form
    return false;
}

// Displays an error message if input is not valid
function validateNumber(values) {
    var text;
    var pass = true;
    // Validate range
    for (var i = 0; i < values.length; i++) {
        // 0 in a form is treated as an empty string, so use strict equality operator
        if (isNaN(values[i]) || values[i] < -50 || values[i] > 50 || values[i] === '') {
            text = "Please enter integer(s) that are between -50 to 50"
            document.getElementById("error_message").innerHTML = text;
            pass = false;
        }
    }
    // Validate order
    if (values[0] > values[1] || values[2] > values[3]) {
        text = "Lower bounds must be less than Upper bounds"
        document.getElementById("error_message").innerHTML = text;
        pass = false;
    }
    return pass;
}

// Creates a dynamic table
function createTable(lh, uh, lv, uv) {
    var table = document.getElementById("multiplication_table");
    var header_row = table.insertRow(0);
    header_row.style.backgroundColor = "lightgrey";
    var increment_var = 1;
    var increment_row = 1;

    // Extra empty cell in top left hand corner
    var new_cell = header_row.insertCell(0);
    new_cell.innerHTML = "";

    // First create the first row
    for (let i = lh; i <= uh; i++) {
        let next_cell = header_row.insertCell(increment_var);
        increment_var = increment_var + 1;
        next_cell.innerHTML = i;
    }

    var lv_index = lv;
    for (let i = lv; i <= uv; i++) {
        var header_row = table.insertRow(increment_row);
        // First, create the first cell in the remaining rows are from the vertical bounds
        var first_cell = header_row.insertCell(0);
        table.rows[increment_row].cells[0].style.backgroundColor = "lightgrey";
        first_cell.innerHTML = lv_index;
        lv_index += 1;
        increment_row += 1;
        increment_var = 1;
        // Next, fill the rest of the cells with the product of the first row and that first cell 
        // calculated in the first step
        for (let j = lh; j <= uh; j++) {
            var new_cell = header_row.insertCell(increment_var);
            new_cell.innerHTML = table.rows[0].cells[increment_var].innerHTML * first_cell.innerHTML;
            increment_var = increment_var + 1;
        }
    }
}
