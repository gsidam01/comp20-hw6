/*
    George Sidamon-Eristoff 
    26 February 2020
    Tufts Comp20 - HW5
*/

function check_amicable()
{
    var number_one = document.number_form.num_one.value;
    var number_two = document.number_form.num_two.value;
    document.getElementById("number_one").innerHTML = "Number one: " +
    	number_one + " ~~ Factors: ";
    document.getElementById("number_two").innerHTML = "Number two: " +
    	number_two + " ~~ Factors: ";
    /* test_isFactor(); */
    /* test_showFactor(); */
    /* test_addFactors(); */
    /* test_getFactors(); */

    var one_factors = getFactors(number_one);
    var two_factors = getFactors(number_two);
	showFactor(one_factors, "number_one");
	showFactor(two_factors, "number_two");

    var sum_factors_one = addFactors(one_factors);
    var sum_factors_two = addFactors(two_factors);

    if (number_one != number_two && sum_factors_one == number_two &&
    	sum_factors_two == number_one) {
    	document.getElementById("amicable_result").innerHTML =
    		"They are amicable!";
    }
    else {
        document.getElementById("amicable_result").innerHTML =
        	"They are not amicable...";
    }
    return;
}

function isFactor(num, test_num)
{
	if ((num % test_num ) === 0) {
		return true;
	}
	return false;
}

/* Test code for the isFactor function, no expected output */
/*
function test_isFactor()
{
	var test1 = isFactor(12, 1);
	var test2 = isFactor(12, 2);
	var test3 = isFactor(12, 3);
	var test4 = isFactor(12, 4);
	var test5 = isFactor(12, 5);
	var test6 = isFactor(12, 6);
	var test7 = isFactor(12, 7);
	var test12 = isFactor(12, 12);
	if (test1 == false || test2 == false || test3 == false || test4 == false) {
		alert("First-four failure");
	}
	if (test5 == true || test6 == false || test7 == true || test12 == false) {
		alert("High-four failure");
	}
}
*/

function showFactor(num_arr, destination)
{
	var length = num_arr.length;
	var populator = "";
	for (let i = 0; i < length; i++) {
		populator += num_arr[i];
		if (i != length - 1) {
			populator += ", ";
		}
	}
	document.getElementById(destination).innerHTML += populator;
	return;
}
/* Test code for the showFactor function, changes one element in the html */
/*
function test_showFactor()
{
	var test_arr = new Array(15, 32, 73, 4, 5, 6, 7, 8, 9, 10);
	showFactor(test_arr);
}
*/


function addFactors(num_arr)
{
    var sum = 0;
    var length = num_arr.length;
    for (let i = 0; i < length; i++) {
    	sum += parseInt(num_arr[i]) || 0;
    }
    return sum;
}

/* Test code for the addFactors function, sends alerts to the browser */
/*
function test_addFactors()
{
	var test_arr_1 = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
	var test_arr_2 = new Array(10, 9, 8, 7, 6, 5, 4, 3, 2, 1);
	var test_arr_3 = new Array("ooeepp", "blaaa");
	alert(addFactors(test_arr_1));
	alert(addFactors(test_arr_2));
	alert(addFactors(test_arr_3));
}
*/

function getFactors(in_number)
{
	var factor_arr = new Array()
	var middle = in_number / 2 + 1
	for (let i = 0; i < middle; i++) {
		if (isFactor(in_number, i)) {
			factor_arr.push(i);
		}
	}
	if (in_number <= 0) {
		factor_arr.push(0);
	}
	return factor_arr;
}

/* Test code for getFactors, sends a number of alerts to the browser */
/*
function test_getFactors()
{
	alert(getFactors(8));
	alert(getFactors(24));
	alert(getFactors(130));
	alert(getFactors(13));
	alert(getFactors(71));
	alert(getFactors(30000));
	alert(getFactors(55));
	alert(getFactors(2));
	alert(getFactors(0));
}
*/
