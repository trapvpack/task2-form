document.addEventListener("DOMContentLoaded", (event) => {
    let formData = {};
    const inputDataStorage = localStorage;
    let form = document.querySelector('form');
    if (document.querySelector('form')) {
        form.addEventListener('input', function (event) {
            formData[event.target.name] = event.target.value;
            inputDataStorage.setItem('formData', JSON.stringify(formData));
        });
    }
    if (inputDataStorage.getItem('formData')) {
        formData = JSON.parse(inputDataStorage.getItem('formData'));
        for (let key in formData) {
            form.elements[key].value = formData[key];
        }
    }
    form.addEventListener('reset', function (event) {
        console.log('reset')
        inputDataStorage.clear();
    })

    const govNumber = document.getElementById("gov-number");
    const passportSeries = document.getElementById("passport-series");
    const passportNumber = document.getElementById("passport-number");

    const govNumberMask = IMask(govNumber,
        {
            mask: 'a000aa 00[0]',
            blocks: {
                a: {
                    mask: IMask.MaskedEnum,
                    enum: ['А', 'В', 'Е', 'К', 'М', 'Н', 'О', 'Р', 'С', 'Т', 'У', 'Х']
                },
                '0': {
                    mask: IMask.MaskedRange,
                    from: 0,
                    to: 9,
                }
            },
            prepare: function (str) {
                return str.toUpperCase();
            }
        });

    const passportSeriesMask = IMask(passportSeries, {
        mask: '00 00',
        blocks: {
            '00': {
                mask: IMask.MaskedRange,
                from: 0,
                to: 99,
                maxLength: 2
            }
        }
    });

    const passportNumberMask = IMask(passportNumber, {
        mask: '000000',
        blocks: {
            '0': {
                mask: IMask.MaskedRange,
                from: 0,
                to: 9
            }
        }
    })
});





