export default class Mortgage {
    constructor(principal, years, rate) {
        this.principal = principal;
        this.years = years;
        this.rate = rate;
    };

    get monthlyRatePercent() {
        let monthlyRate = this.rate / 100 / 12;
        return monthlyRate * 100;
    }

    get monthlyPayment() {
        let monthlyRate = this.rate / 100 / 12;
        return this.principal * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate),
            this.years * 12)));
    };

    get amortization() {
        let monthlyPayment = this.monthlyPayment;
        let monthlyRate = 0;
        monthlyRate = this.rate / 100 / 12;
        let balance = this.principal;
        let amortization = [];

        for (let y = 0; y < this.years; y++) {
            let interestForYearY = 0;
            let principalForYearY = 0;

            for (let m = 0; m < 12; m++) {
                let interestForMonthM = balance * monthlyRate;
                let principalForMonthM = monthlyPayment - interestForMonthM;
                interestForYearY += interestForMonthM;
                principalForYearY += principalForMonthM;
                balance -= principalForMonthM;
            };
            amortization.push({ principalForYearY, interestForYearY, balance });
        };
        return amortization;
    };
};