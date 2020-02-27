/*
    George Sidamon-Eristoff 
    26 February 2020
    Tufts Comp20 - HW5
*/

/*
 * comparison() is my main() function
 *   it changes elements on screen
 *   called by the client by clicking a button
 *   errors are caused by illegally formatted user input
 */
function comparison() {
    wipe_boxes();

    var user_num_arr = new Array(5);
    user_num_arr = get_five_input(user_num_arr);
    if (user_num_arr.length != 5) {
        alert("Please enter the correct amount of numbers.");
        throw "Please enter the correct amount of numbers.";
        wipe_boxes();
        return;
    }
    var user_lb = get_lb_input();
    sort_five(user_num_arr);
    display_arr(user_num_arr, "Your Special", user_lb);

    var generated_num_arr = new Array(6);
    generated_num_arr = gen_six(generated_num_arr);

    var correct_counter = 0;
    for (let u = 0; u < 5; u++) {
        for (let g = 0; g < 5; g++) {
            if (generated_num_arr[g] === user_num_arr[u]) {
                correct_counter++;
            }
        }
    }
    var luckyball_bool = false;
    if (generated_num_arr[5] == user_lb) {
        luckyball_bool = true;
    }
    message_client(correct_counter, luckyball_bool);
    return;
}

/*
 * wipe_boxes() clears the elements of the #results_zone section
 *   it changes elements on screen
 *   no client interaction
 *   no associated errors
 */
function wipe_boxes() {
    document.getElementById("Unsorted Generated").innerHTML = "";
    document.getElementById("Sorted Generated").innerHTML = "";
    document.getElementById("Your Special").innerHTML = "";
    document.getElementById("Your Winnings").innerHTML = "";
}

/*
 * get_five_input() reads in five numbers from a text box
 *   no screen elements changed
 *   recieves input which client leaves in a form
 *   no associated errors
 */
function get_five_input(user_num_arr) {
    var long_str = document.number_form.five_nums.value;
    long_str = long_str.trim();
    user_num_arr = long_str.split(" ");
    return user_num_arr;
}

/*
 * get_lb_input() reads in a number representing a Lucky Ball
 *   no screen elements changed
 *   recieves input which client leaves in a form text box
 *   no associated errors
 */
function get_lb_input() {
    var lb_str = document.number_form.luck_ball.value;
    lb_str = lb_str.trim();
    return lb_str;
}

/*
 * sort_five() sorts the first five elements of an array with the lowest value
 *  at the lowest index
 *   no screen elements changed
 *   input parameter is an array
 *   no client interaction
 *   no associated errors
 */
function sort_five(num_arr) {
    for (let i = 0; i < 5; i++) {
        num_arr[i] = parseInt(num_arr[i]);
    }
    num_arr.sort(function(a, b){return a-b});
}

/*
 * display_arr() edits sections of html code to display the values of an array
 *   changes html elements designated by "destination" parameter
 *   "num_arr" parameter is the array
 *   "luckyball" parameter is an additional number to be displayed specially
 *   no input from client
 *   no associated errors
 */
function display_arr(num_arr, destination, luckyball) {
    var display_me = destination + " Numbers: <strong>";
    for (let i = 0; i < 5; i++) {
        var str_temp = (num_arr[i]).toString();
        display_me += str_temp;
        if (i != 4) {
            display_me += ", ";
        }
    }
    display_me += "</strong><br />Lucky Ball: <strong>" + luckyball +
                  "</strong><br /><br />";
    document.getElementById(destination).innerHTML = display_me;
    return;
}


/*
 * gen_six() generates six random numbers and stores them in an array passed in
 *  by reference
 *   indirectly changes html elements by calling display_arr()
 *   "num_arr" parameter is the array in which the generated numbers are stored
 *   no direct client interaction
 *   no associated errors
 */
function gen_six(num_arr) {
    for (i = 0; i < 5; i++) {
        num_arr[i] = gen_random_str_int(1, 48);
    }
    check_no_repeat(num_arr);
    luckyball = gen_random_str_int(1, 18);
    display_arr(num_arr, "Unsorted Generated", luckyball);
    sort_five(num_arr);
    display_arr(num_arr, "Sorted Generated", luckyball);
    num_arr[5] = luckyball;
    return num_arr;
}

/*
 * gen_random_str_int() generates a random number and returns it as a string
 *   no direct client interaction
 *   no associated errors
 *   inputs "min" and "max" represent the bounds of the desired range
 */
function gen_random_str_int(min, max) {
    var ret_me = Math.round(min + Math.random() * (max-min));
    ret_me = ret_me.toString();
    return ret_me;
}

/*
 * check_no_repeat() iterates through an array to replace all repeated elements
 *   no direct client interaction
 *   no associated errors
 *   recursively calls itself to double-check once a value has been changed
 */
function check_no_repeat(num_arr) {
    var repeat_bool = false;
    for (let i = 0; i < 5; i++) {
        for (let g = i + 1; g < 5; g++) {
            if (num_arr[i] === num_arr[g]) {
                num_arr[i] = gen_random_str_int(1, 48);
                repeat_bool = true;
            }
        }
    }
    if (repeat_bool === true) {
        check_no_repeat(num_arr);
    }
    return;
}



/*
 * message_client() changes an html page to reflect the results of the entire
 *  comparison() function
 *   changes html elements
 *   no associated errors
 *   inputs "correct_counter" and "luckyball_bool" are used to determine which
 *    case to execute
 */


function message_client(correct_counter, luckyball_bool) {
    var five_plus_lb = "$7,000 a WEEK for LIFE!";
    var five_flat = "$25,000 a YEAR for LIFE!";
    var four_plus_lb = "$5,000";
    var four_flat = "$200";
    var three_plus_lb = "$150";
    var three_flat = "$20";
    var two_plus_lb = "$25";
    var two_flat = "$3";
    var one_plus_lb = "$6";
    var zero_plus_lb = "$4";
    if (correct_counter === 5 && luckyball_bool == true) {
        document.getElementById("Your Winnings").innerHTML =
            "Winnings: <strong>" + five_plus_lb + "</strong>";
    }
    else if (correct_counter === 5 && luckyball_bool === false) {
        document.getElementById("Your Winnings").innerHTML =
            "Winnings: <strong>" + five_flat + "</strong>";
    }
    else if (correct_counter === 4 && luckyball_bool === true) {
        document.getElementById("Your Winnings").innerHTML =
            "Winnings: <strong>" + four_plus_lb + "</strong>";
    }
    else if (correct_counter === 4 && luckyball_bool === false) {
        document.getElementById("Your Winnings").innerHTML =
            "Winnings: <strong>" + four_flat + "</strong>";
    }
    else if (correct_counter === 3 && luckyball_bool === true) {
        document.getElementById("Your Winnings").innerHTML =
            "Winnings: <strong>" + three_plus_lb + "</strong>";
    }
    else if (correct_counter === 3 && luckyball_bool === false) {
        document.getElementById("Your Winnings").innerHTML =
            "Winnings: <strong>" + three_flat + "</strong>";
    }
    else if (correct_counter === 2 && luckyball_bool === true) {
        document.getElementById("Your Winnings").innerHTML =
            "Winnings: <strong>" + two_plus_lb + "</strong>";
    }
    else if (correct_counter === 2 && luckyball_bool === false) {
        document.getElementById("Your Winnings").innerHTML =
            "Winnings: <strong>" + two_flat + "</strong>";
    }
    else if (correct_counter === 1 && luckyball_bool === true) {
        document.getElementById("Your Winnings").innerHTML =
            "Winnings: <strong>" + one_plus_lb + "</strong>";
    }
    else if (correct_counter === 0 && luckyball_bool === true) {
        document.getElementById("Your Winnings").innerHTML =
            "Winnings: <strong>" + zero_plus_lb + "</strong>";
    } else {
        document.getElementById("Your Winnings").innerHTML =
            "Winnings: <strong>$0</strong>";
    }
}
