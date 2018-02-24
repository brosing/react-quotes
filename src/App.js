import React from 'react'

class App extends React.Component {
  state = { quotes: null }

  componentDidMount() {
    const hundredOfQuotes = 'hundredOfQuotes'
    const localQuotes = localStorage.getItem(hundredOfQuotes)
    const quotes = JSON.parse(localQuotes)

    if (localQuotes !== null) {
      this.setState(() => ({ quotes }))
    } else {
      fetch('https://talaikis.com/api/quotes/')
        .then(res => res.json())
        .then(res => {
          localStorage.setItem(hundredOfQuotes, JSON.stringify(res))
          this.setState(() => ({ quotes: res }))
        })
    }
  }

  randomQuote = (quotes) => {
    const choosen = quotes[Math.floor(Math.random() * quotes.length)]
    return (<div> { choosen.quote }, <p>{choosen.author}</p> </div>)
  }

  renderAllQuotes = () => {
    const { quotes } = this.state
    return quotes === null
      ? 'Loading...'
      : this.randomQuote(quotes)
  }

  render() {
    return (
      <div>
        { this.renderAllQuotes() }
      </div>
    )
  }
}

export default App
