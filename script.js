'use script';

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

/* Hide Loading */

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote

function newQuotes() { // Here I am retrieving the quote data locally, so it gives a good performance speed when retrieving new quotes
    loading();
    // Pick a random quote from apiQuotes aray
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if Author field is blank and replace it with 'Unknown'

    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // Check the Quote length to determine styling

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();

    // It's not possible to see the loading effect as we retrieve new quotes because it's loading so fast that we cannot see it, because we're getting the data locally.
    // We can only see the loading effect when we reload the page because we're retrieving the data from the external server.
};

// Get Quotes From API

async function getQuotes() {
    loading();

    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuotes();

    } catch (error) {
        // Catch Error
    }

    complete();
};

// Tweet Quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// On Load

getQuotes();
