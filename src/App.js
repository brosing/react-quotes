import React from 'react'

class App extends React.Component {
  state = {
    quotes: null,
    quote: null
  }

  componentDidMount() {
    const hundredOfQuotes = 'hundredOfQuotes'
    const localQuotes = localStorage.getItem(hundredOfQuotes)
    const quotes = JSON.parse(localQuotes)

    if (localQuotes !== null) {
      this.setState(() => ({ quotes }), this.setIntervalQuote)
    } else {
      this.fetchQuotes(hundredOfQuotes)
    }
  }

  fetchQuotes = (hundredOfQuotes) => {
    fetch('https://talaikis.com/api/quotes/')
      .then(res => res.json())
      .then(res => {
        localStorage.setItem(hundredOfQuotes, JSON.stringify(res))
        this.setState(() => ({ quotes: res }), this.setIntervalQuote)
      })
  }

  getRandomQuotes = () => {
    const { quotes } = this.state
    const quote = quotes[Math.floor(Math.random() * quotes.length)]
    this.setState(() => ({ quote }))
  }

  setIntervalQuote = () => {
    this.getRandomQuotes()
    setInterval(this.getRandomQuotes, 5000)
  }

  render() {
    const { quote } = this.state

    return quote === null
      ? (
        <p>Loading...</p>
      )
      : (
        <div>
          <p>{ quote.quote }</p>
          <p>{ quote.author }</p>
        </div>
      )
  }
}

export default App
