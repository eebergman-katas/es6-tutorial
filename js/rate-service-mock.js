let rates = [
    {
        'name': '30 year fixed',
        'rate': '13',
        'years': '30'
        ,
    },
    {
        'name': '20 year fixed',
        'rate': '2.8',
        'years': '20',
    },
];

export let findAll = () => new Promise((resolve, reject) => {
    if (rates) {
        resolve(rates);
    } else {
        reject('No rates');
    }
});
