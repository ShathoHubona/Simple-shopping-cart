var udpateSubtotal = function (){
    var subtotalArr = [];
    $('tbody tr').each(function (i, ele) {
        var price = parseFloat($(ele).find('.price').text());
        var quantity = parseFloat($(ele).find('.quantity input').val());
        
        var subtotal = (price*quantity);
        //console.log(price);
        $(ele).find('.subtotal').html('$'+subtotal.toFixed(2));
        subtotalArr.push(subtotal);

    });
    if (subtotalArr.length > 0) {
        var total = subtotalArr.reduce((sum, num) => sum + num);
        $('#totalCart').html('$'+total.toFixed(2));
    } else {
        $('#totalCart').html('$0.00');
    };
};

$(document).ready(function () {
    udpateSubtotal();
    //
    $('body').on('click', '.remove', function (event) {
        $(this).closest('tr').remove();
        udpateSubtotal();
    });

    var timeout;
    $('body').on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        udpateSubtotal();
    }, 500);
    })

    $('#addItem').submit(function (event) {
        event.preventDefault();

        // Retrieve values from the input fields
        var newItem = $('#addItem .item').val();
        var newPrice = parseFloat($('#addItem .price').val());

        // Check if the values are valid
        if (newItem && !isNaN(newPrice) && newPrice >= 0) {
            // Create a new row and append it to the table
            var newRow = '<tr>' +
                '<td class="item">' + newItem + '</td>' +
                '<td class="price">' + newPrice.toFixed(2) + '</td>' +
                '<td class="quantity">' +
                    '<label>QTY</label>' +
                    '<input type="number" min="0" value="1">' +
                    '<button class="btn btn-light btn-sm remove">Cancel</button>' +
                '</td>' +
                '<td class="subtotal"></td>' +
            '</tr>';

            $('tbody').append(newRow);

            // Update subtotals and total
            udpateSubtotal();

            // Clear input fields
            $('#addItem .item').val('');
            $('#addItem .price').val('');
        }
    });
});

