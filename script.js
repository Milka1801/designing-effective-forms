let clickCount = 0;

const countryInput = document.getElementById('country');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');

function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data.map(country => country.name.common).sort();
        const datalist = document.getElementById('countries');
        datalist.innerHTML = countries
            .map(country => `<option value="${country}">`)
            .join('');
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

function getCountryByIP() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            const country = data.country;
            countryInput.value = country;
            getCountryCode(country);
        })
        .catch(error => {
            console.error('Błąd pobierania danych z serwera GeoJS:', error);
        });
}

function getCountryCode(countryName) {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        return response.json();
    })
    .then(data => {        
        const countryCode = data[0].idd.root + data[0].idd.suffixes.join("")
        const countryCodeSelect = document.getElementById('countryCode');
        const options = Array.from(countryCodeSelect.options);
        const matchedOption = options.find(opt => opt.value === countryCode);
            if (matchedOption) {
                countryCodeSelect.value = matchedOption.value;
            } else {
                const newOption = document.createElement('option');
                newOption.value = countryCode;
                newOption.textContent = `${countryCode} (${countryName})`;
                newOption.selected = true;
                countryCodeSelect.appendChild(newOption);
            }
    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    });
}


(() => {
    // nasłuchiwania na zdarzenie kliknięcia myszką
    document.addEventListener('click', handleClick);

    fetchAndFillCountries();
    getCountryByIP();

    document.addEventListener('keydown', function (event) {
        
        // Przejście na pierwszy input
        if (event.shiftKey && event.key === 'F') {
            event.preventDefault();
            const firstInput = document.getElementById('firstName');
            if (firstInput) {
                firstInput.focus();
            }
        }

        // Zmiana checkboxa w vat'ie
        if (event.ctrlKey && event.shiftKey && event.key === 'V') {
            event.preventDefault();
            const vatCheckbox = document.getElementById('vatUE');
            if (vatCheckbox) {
                vatCheckbox.checked = !vatCheckbox.checked;
                const vatFields = document.getElementById('vatFields');
                if (vatFields) {
                    vatFields.classList.toggle('d-none', !vatCheckbox.checked);
                }
            }
        }

        const focusable = Array.from(document.querySelectorAll('input, select, textarea'))
                .filter(el => !el.disabled && el.offsetParent !== null);
        const index = focusable.indexOf(document.activeElement);

        // Następne pole formularza
        if (event.ctrlKey && event.shiftKey && event.key === 'ArrowDown') {
            event.preventDefault();
            if (index > -1 && index < focusable.length - 1) {
                focusable[index + 1].focus();
            }
        }
        
        // Poprzednie pole formularza
        if ((event.ctrlKey && event.shiftKey && event.key === 'ArrowUp') && index > 0) {
            event.preventDefault();
            focusable[index - 1].focus();
        }

        const active = document.activeElement;

        // Input typu radio reaguje poprawnie na enter
        if (active && active.type === 'radio' && event.key === 'Enter') {
            event.preventDefault();
            active.checked = true;
        }
    });
})()

// Walidacja maila
const emailInput = document.getElementById('exampleInputEmail1');

emailInput.addEventListener('blur', function () {
    if (!emailInput.value || !emailInput.checkValidity()) {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
    } else {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
    }
});

// Walidacja hasła
const passwordInput = document.getElementById('exampleInputPassword1');

passwordInput.addEventListener('blur', function () {
    if (!passwordInput.value || !passwordInput.checkValidity()) {
        passwordInput.classList.add('is-invalid');
        passwordInput.classList.remove('is-valid');
    } else {
        passwordInput.classList.remove('is-invalid');
        passwordInput.classList.add('is-valid');
    }
});

// Walidacja kodu pocztowego
const zipInput = document.getElementById('zipCode');

zipInput.addEventListener('blur', function () {
    const regex = /^\d{2}-\d{3}$/;
    if (regex.test(zipInput.value)) {
        zipInput.classList.remove('is-invalid');
        zipInput.classList.add('is-valid');
    } else {
        zipInput.classList.add('is-invalid');
        zipInput.classList.remove('is-valid');
    }
});


// Walidacja numeru telefonu
const phoneInput = document.getElementById('phoneNumber');

phoneInput.addEventListener('blur', function () {
    const regex = /^\d{3}-\d{3}-\d{3}$/;
    if (regex.test(phoneInput.value)) {
        phoneInput.classList.remove('is-invalid');
        phoneInput.classList.add('is-valid');
    } else {
        phoneInput.classList.add('is-invalid');
        phoneInput.classList.remove('is-valid');
    }
});