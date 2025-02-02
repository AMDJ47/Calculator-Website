document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");

    // Append value to the display
    window.appendToDisplay = function(value) {
        display.value += value;
    };

    // Clear the display
    window.clearDisplay = function() {
        display.value = "";
    };

    // Delete the last character
    window.deleteLast = function() {
        display.value = display.value.slice(0, -1);
    };

    // Evaluate and calculate the result
    window.calculateResult = function() {
        try {
            let result = evaluateExpression(display.value);
            display.value = result;
        } catch (error) {
            display.value = "Error";
        }
    };

    // Convert degrees to radians
    function toRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }

    // Evaluate mathematical expressions
    function evaluateExpression(expression) {
        const safeExpression = expression
            .replace(/sin\(/g, "Math.sin(" + Math.PI/180 + "*")
            .replace(/cos\(/g, "Math.cos(" + Math.PI/180 + "*")
            .replace(/tan\(/g, "Math.tan((" + Math.PI/180 + "*")
            .replace(/log\(/g, "Math.log10(")
            .replace(/sqrt\(/g, "Math.sqrt(")
            .replace(/pi/g, "Math.PI")
            .replace(/e/g, "Math.E")
            .replace(/\^/g, "**"); // Replace ^ with ** for exponents

        // Safely evaluate the expression
        const result = new Function("return " + safeExpression)();
        return isNaN(result) || !isFinite(result) ? "Error" : result;
    }
});