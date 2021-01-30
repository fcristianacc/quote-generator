const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");

let apiQuotes = [];

// Show New Quote
function newQuote() {
  // Pick a Random Quote from the apiQuotes Array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);

  if (!quote.author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quote.author;
  }

  //Check Quote Length to determine the styling
  if (quote.text.length > 240) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
}

// Get Quotes From API
async function getQuote() {
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
    console.log("Whoops, no quote!", error);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetQuote);

// On Load
getQuote();
