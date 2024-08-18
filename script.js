// DOM elements to display the result and calculation
resultDisplay = document.getElementById("display-result");
calculateDisplay = document.getElementById("display-calculate");

let calculation = ""; // Stores the current calculation as a string
let equalsPressed = false; // Flag to check if equals was pressed
let result = ""; // Stores the result of the calculation

// Function to handle numeric and operator input (e.g., digits 0-9, decimal point)
function pressed(input) {
  if (equalsPressed) {
    calculation = input; // Reset calculation with the new input after equals is pressed
    resultDisplay.value = input; // Display the input in the result display
    calculateDisplay.innerHTML = ""; // Clear the calculation display
    equalsPressed = false; // Reset the equalsPressed flag
  } else {
    if (resultDisplay.value === "0") {
      resultDisplay.value = input; // Replace the initial "0" with the new input
      calculation += input; // Add the input to the calculation string
    } else {
      resultDisplay.value += input; // Append the input to the current display
      calculation += input; // Append the input to the calculation string
    }
  }
}

// Function to handle special inputs (e.g., operators, equals, and clear)
function symbolPressed(input) {
  switch (input) {
    case "+":
    case "-":
    case "*":
    case "/":
      calculation += input; // Append the operator to the calculation string
      resultDisplay.value = "0"; // Reset the result display for the next number
      calculateDisplay.innerHTML = calculation; // Display the ongoing calculation
      break;

    case "AC":
      calculateDisplay.innerHTML = ""; // Clear the calculation display
      resultDisplay.value = "0"; // Reset the result display
      calculation = ""; // Reset the calculation string
      break;

    case ".":
      resultDisplay.value += input; // Append the decimal point to the current display
      calculation += input; // Append the decimal point to the calculation string
      break;

    case "=":
      calculateDisplay.innerHTML = calculation + "="; // Show the complete calculation
      try {
        result = eval(calculation); // Evaluate the calculation string
        if (result.toString().length > 13) {
          result = result.toExponential(2); // Convert long results to exponential notation
          resultDisplay.value = result; // Display the result
        } else {
          resultDisplay.value = result; // Display the result directly
        }
      } catch {
        resultDisplay.value = "Math Error"; // Handle errors in calculation (e.g., invalid input)
      }
      equalsPressed = true; // Set the flag that equals was pressed
      break;
  }
}
