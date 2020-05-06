const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')


let data = []

getRandomUser()
getRandomUser()
getRandomUser()

//Fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    addData(newUser)
}

function doubleMoney() {
    data = data.map(money => {
        return { ...money, money: money.money * 2 }
    })
    updateDOM()
}

function sortRiches() {
    data.sort((a, b) => b.money - a.money);
    updateDOM()
}

function showMillionaires() {
    data = data.filter(data => data.money > 1000000)
    updateDOM()
}

function wealthSum() {
    const wealth = data.reduce((acc, num) => (acc += num.money), 0)
    updateDOM()
    const wealthEl = document.createElement('div')
    wealthEl.innerHTML = `<h3>Total Wealth is <strong>$${formatMoney(wealth)}</strong`
    main.appendChild(wealthEl)

}

function addData(obj) {
    data.push(obj);
    updateDOM()
}

//Use = in parameter to show that if initial parameter is not present, then default to second parameter
function updateDOM(providedData = data) {
    //Clear main div
    main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
    providedData.forEach(person => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${person.name}</strong>$${formatMoney(person.money)}`
        main.appendChild(element)
    })
}

function formatMoney(number) {
    return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}



addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortRiches)
showMillionairesBtn.addEventListener('click', showMillionaires)
calculateWealthBtn.addEventListener('click', wealthSum)