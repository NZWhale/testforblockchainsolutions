// import React from 'react';
import * as React from 'react'
import { render } from 'react-dom'
import "bootstrap/dist/css/bootstrap.css";
import { PortfolioPage } from "./CryptoPortfolioPage/index"
import { ExchangePage } from "./ExchangePage/index"

class App extends React.Component {
    render() {

        const portfolio = {
            BTC: 1234.78,
            ETH: 3128.50,
            USD: 9405
        }
        return (
            <>
                <ExchangePage portfolio={portfolio}/>
                {/* <PortfolioPage portfolio={portfolio} /> */}
            </>
        )
    }
}


render(<App />, document.getElementById("root"))