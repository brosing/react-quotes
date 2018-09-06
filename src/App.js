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

  setIntervalQuote = () => {
    this.getRandomQuotes()
    setInterval(this.getRandomQuotes, 10000)
  }

  getRandomQuotes = () => {
    const { quotes } = this.state
    const quote = quotes[Math.floor(Math.random() * quotes.length)]
    this.setState(() => ({ quote }))
  }

  render() {
    const { quote } = this.state

    return quote === null
      ? (
        <p>Loading...</p>
      )
      : (
        <div className='content'>

          {/* BACKGROUND */}
          <div className='glitch'>
            <div className='glitch__img' />
            <div className='glitch__img' />
            <div className='glitch__img' />
            <div className='glitch__img' />
            <div className='glitch__img' />
          </div>

          {/* TEXT */}
          <p className='content__text'>~ { quote.quote }</p>
          <p className='content__title'>{ quote.author }</p>

          {/* EMBED */}
          <a
            style={{
              position: 'absolute',
              bottom: '30px',
              backgroundColor: '#222',
              color: 'white',
              textDecoration: 'none',
              padding: '4px 6px',
              fontSize: 12,
              fontWeight: 'bold',
              lineHeight: '1.2',
              display: 'inline-block',
              borderRadius: 3
            }}
            href='https://unsplash.com/photos/T6fDN60bMWY'
          >
            <span style={{display: 'inline-block', padding: '2px 3px'}}>
              <svg xmlns='http://www.w3.org/2000/svg' style={{height: 12, width: 'auto', position: 'relative', verticalAlign: 'middle', top: '-1px', fill: 'white'}} viewBox='0 0 32 32'>
                <title>unsplash-logo</title>
                <path d='M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z' />
              </svg>
            </span>
            <span style={{display: 'inline-block', padding: '2px 3px'}}> by Edho Pratama</span>
          </a>
        </div>
      )
  }
}

export default App
