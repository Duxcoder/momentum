import jsonRus from '../quotes/quotesRu.json';

const Quotes = (lang) => {
    const randomNum = (min, max) => {
        let random = min + Math.random() * (max + 1 - min);
        return Math.floor(random);
    }
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');
    const btnChange = document.querySelector('.change-quote');
    const render = (text, authorText) => {
        quote.textContent = text;
        author.textContent = authorText;
    }
    fetch(lang === 'ru' ?  jsonRus : 'https://type.fit/api/quotes')
    .then(response => response.json())
    .then(data => {
        let quoteItem = data[randomNum(0, data.length - 1)];
            render(quoteItem.text, quoteItem.author);
        btnChange.onclick = function () {
            quoteItem = data[randomNum(0, data.length - 1)];
            render(quoteItem.text, quoteItem.author);
        }
    })
}
export default Quotes