const apiKey = 'f519a884a1280347d1e2e184'; // Replace with your API key
const apiURL = 'https://v6.exchangerate-api.com/v6/' + apiKey;

const currencyList = ["USD", "EUR", "GBP", "INR", "AUD", "CAD", "SGD", "CHF", "MYR", "JPY", "CNY","UGX"];

document.addEventListener("DOMContentLoaded", function() {
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");

    currencyList.forEach(currency => {
        let option1 = document.createElement("option");
        option1.text = currency;
        option1.value = currency;
        fromCurrency.add(option1);

        let option2 = document.createElement("option");
        option2.text = currency;
        option2.value = currency;
        toCurrency.add(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
});

async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (amount === "") {
        alert("Please enter an amount");
        return;
    }

    try {
        const response = await fetch(`${apiURL}/pair/${fromCurrency}/${toCurrency}/${amount}`);
        const data = await response.json();

        if (data.result === "success") {
            const convertedAmount = data.conversion_result;
            document.getElementById("result").innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        } else {
            alert("Error fetching exchange rate");
        }
    } catch (error) {
        console.error("Error fetching exchange rate: ", error);
        alert("Error fetching exchange rate");
    }
}
