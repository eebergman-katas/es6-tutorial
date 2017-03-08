import Mortgage from './mortgage';

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