window.addEventListener('load', function (e) {
    const card = document.querySelector('#card');
    const prices = card.querySelectorAll('.price') // array
    const counts = card.querySelectorAll('.count') // array
    const countPrices = card.querySelectorAll('.countPrice') // element 
    const total = card.querySelector('.total')

    countPrices.forEach((item, index) => {
        let currency = prices[index].innerHTML * counts[index].innerHTML
        item.innerHTML = toCurrency(currency)
    })

    total.innerHTML = toCurrency(total.innerHTML)

    function toCurrency(val) {
        return new Intl.NumberFormat('en-EN', {
            style: 'currency',
            currency: 'USD'
        }).format(val)
    }

    card.addEventListener('click', (e) => {
        const contains = e.target.classList.contains('remove-btn')
        if (contains) {
            // button bor bo'sa bo'tga kiradi 
            const id = e.target.getAttribute('id')

            fetch('/card/delete/' + id, {
                    method: "delete",
                }).then(res => res.json())
                .then(card => {
                    if (card.items.length > 0) {
                        const html = card.items.map(item => {
                            return `
                            <tr>
                                    <td>${item.name}</td>
                                    <td class="count">${toCurrency(item.count)}</td>
                                    <td class="price">${item.price}</td>
                                    <td class="countPrice">${toCurrency(+item.price * item.count)}</td>
                                    <td>
                                        <button id="${item.id}" data-id="${item.id}" class="btn remove-btn" style="background-color: red;">Delete</button>
                                    </td>
                                </tr>
                            `
                        }).join('')

                        card.querySelector('tbody').innerHTML = html
                        card.querySelector('.total').innerHTML = toCurrency(card.price)

                    } else {
                        card.innerHTML = '<h2>Card is empty</h2>'
                    }
                })
        }
    })
});