class Mortgage {
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

document.getElementById('calcBtn').addEventListener('click', () => {

    let principal = document.getElementById('principal').value;
    let years = document.getElementById('years').value;
    let rate = document.getElementById('rate').value;
    let mortgage = new Mortgage(principal, years, rate);

    document.getElementById('monthlyPayment').innerHTML = mortgage.monthlyPayment.toFixed(2);
    document.getElementById('monthlyRate').innerHTML = mortgage.monthlyRatePercent.toFixed(2);
    let html = "";

    mortgage.amortization.forEach((year, index) => html += `

         <tr>
            <td>Year: ${index + 1}</td><br/>
            <td class="currency">Principal: $${Math.round(year.principalForYearY)}</td><br/>
            <td class="currency left">Interest: $${Math.round(year.interestForYearY)}</td><br/>
            <td class="currency">Balance: $${Math.round(year.balance)}</td>
            <td class="stretch">
                <div class="flex">
                    <div class="bar principal"
                         style="flex:${year.principalForYearY};-webkit-flex:${year.principalForYearY}">
                    </div>
                    <div class="bar interest"
                         style="flex:${year.interestForYearY};-webkit-flex:${year.interestForYearY}">
                    </div>
                </div>
                <br/>
            </td>
        </tr>
    `);
    document.getElementById("amortization").innerHTML = html;
});