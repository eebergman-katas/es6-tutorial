let url = 'rates.json';

fetch(url)
    .then((response) => response.json())
    .then((rates) => {
        let html = '';
        rates.forEach((rate) => html += `
            <tr>
                <td>Mortgage Name: ${rate.name}
                </td>
                <td>
                    Length in years: ${rate.years}
                </td>
                <td>
                    Interest Rate: ${rate.rate}%
                </td>
            </tr>
        `);
        document.getElementById('rates').innerHTML = html;
    })
    .catch((e) => console.log(e));
