'use strict';

var calculateMonthlyPayment = function calculateMonthlyPayment(principal, years, rate) {
    var monthlyRate = 0;
    if (rate) {
        monthlyRate = rate / 100 / 12;
    }
    var monthlyPayment = principal * monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), years * 12));

    return { principal: principal, years: years, rate: rate, monthlyPayment: monthlyPayment, monthlyRate: monthlyRate };
};

var calculateAmortization = function calculateAmortization(principal, years, rate) {
    var _calculateMonthlyPaym = calculateMonthlyPayment(principal, years, rate),
        monthlyRate = _calculateMonthlyPaym.monthlyRate,
        monthlyPayment = _calculateMonthlyPaym.monthlyPayment;

    var balance = principal;
    var amortization = [];

    for (var y = 0; y < years; y++) {
        var interestForYearY = 0;
        var principalForYearY = 0;

        for (var m = 0; m < 12; m++) {
            var interestForMonthM = balance * monthlyRate;
            var principalForMonthM = monthlyPayment - interestForMonthM;
            interestForYearY += interestForMonthM;
            principalForYearY += principalForMonthM;
            balance -= principalForMonthM;
        };
        amortization.push({ principalForYearY: principalForYearY, interestForYearY: interestForYearY, balance: balance });
    };
    return { monthlyPayment: monthlyPayment, monthlyRate: monthlyRate, amortization: amortization };
};

document.getElementById('calcBtn').addEventListener('click', function () {
    var principal = document.getElementById("principal").value;
    var years = document.getElementById("years").value;
    var rate = document.getElementById("rate").value;

    var _calculateAmortizatio = calculateAmortization(principal, years, rate),
        monthlyPayment = _calculateAmortizatio.monthlyPayment,
        monthlyRate = _calculateAmortizatio.monthlyRate,
        amortization = _calculateAmortizatio.amortization;

    document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
    document.getElementById("monthlyRate").innerHTML = (monthlyRate * 100).toFixed(2);
    amortization.forEach(function (month) {
        return console.log(month);
    });
});

// document.getElementById('calcBtn').addEventListener('click', () => {

//     let principal = document.getElementById("principal").value;
//     let years = document.getElementById("years").value;
//     let rate = document.getElementById("rate").value;

//     let { monthlyPayment, monthlyRate, amortization } = calculateAmortization(principal, years, rate);
//     document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2),
//     document.getElementById("monthlyRate").innerHTML = (monthlyRate * 100).toFixed(2),
//     amortization.forEach(month => console.log(month));
// });
