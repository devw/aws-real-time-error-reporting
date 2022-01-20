(async () => {
    const URL = 'orders.out';
    const response = await fetch(URL);
    const text = await response.text();
    document.querySelector('tbody').innerHTML = text;
})();
