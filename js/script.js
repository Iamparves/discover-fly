document.getElementById('firstClassPlus').addEventListener('click', function () {
    handleQuantityChange('firstClassQuantity', 1);
})

document.getElementById('firstClassMinus').addEventListener('click', function () {
    handleQuantityChange('firstClassQuantity', -1);
})

document.getElementById('economoyPlus').addEventListener('click', function () {
    handleQuantityChange('economyQuantity', 1);
})

document.getElementById('economoyMinus').addEventListener('click', function () {
    handleQuantityChange('economyQuantity', -1);
})

document.getElementById('book-now').addEventListener('click', handleBooking)

document.getElementById('booking-popup--close').addEventListener('click', closePopup)

// Handles the changes of tickets quantity
function handleQuantityChange(id, addValue) {
    const quantityNumber = getInputNumber(id);
    const newQuantity = quantityNumber + addValue;
    // Does not allow the quantity to go below 0
    if (newQuantity < 0) {
        return
    }
    document.getElementById(id).value = newQuantity;

    calculateTotal();
}

// Calculates subtotal, vat and total
function calculateTotal() {
    const firstClassQuantity = getInputNumber('firstClassQuantity');
    const economyQuantity = getInputNumber('economyQuantity');

    const subtotal = (firstClassQuantity * 150) + (economyQuantity * 100);
    const vat = subtotal * .1;
    const total = subtotal + vat;

    document.getElementById('subtotal').innerText = subtotal;
    document.getElementById('vat').innerText = vat;
    document.getElementById('total').innerText = total;
}

// Converts input field string to a number
function getInputNumber(id) {
    const inputValue = document.getElementById(id).value;
    const inputNumber = parseInt(inputValue);

    return inputNumber;
}

// Handle tickets booking
function handleBooking() {
    const bookingTitle = document.getElementById('booking__title');
    const bookingDescrtion = document.getElementById('booking__description');
    const firstClassQuantity = getInputNumber('firstClassQuantity');
    const economyQuantity = getInputNumber('economyQuantity');
    const subtotal = document.getElementById('subtotal').innerText;
    const vat = document.getElementById('vat').innerText;
    const total = document.getElementById('total').innerText;

    if (firstClassQuantity == 0 && economyQuantity == 0) {
        bookingTitle.innerText = 'Booking Unsuccessful';
        bookingDescrtion.innerText = 'You need to buy at least one ticket.';
        bookingTitle.style.color = '#f05f2a';
    } else {
        bookingTitle.innerText = 'Booking Successful';
        bookingDescrtion.innerText = 'You booked ' + firstClassQuantity + ' first class seat and ' + economyQuantity + ' economy seat. Your subtotal cost is $' + subtotal + ', VAT is $' + vat + ' and total cost is $' + total;
        bookingTitle.style.color = '#26db8a';
    }

    document.getElementById('firstClassQuantity').value = 0;
    document.getElementById('economyQuantity').value = 0;
    calculateTotal();

    document.getElementById('booking-popup').style.visibility = 'visible';
    document.getElementById('booking-popup').style.opacity = '1';
    document.getElementById('booking').style.transform = 'scale(1)';
}

// Close Booking Popup
function closePopup() {
    document.getElementById('booking').style.transform = 'scale(0)';
    document.getElementById('booking-popup').style.opacity = '0';
    document.getElementById('booking-popup').style.visibility = 'hidden';
}