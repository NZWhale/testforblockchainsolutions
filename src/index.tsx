// import React from 'react';
import * as React from 'react'
import {render} from 'react-dom'
import "bootstrap/dist/css/bootstrap.css";
import {CurrencyBlock} from "./ExchangePage/CurrencyBlock"
import { Portfolio } from './PortfolioModel';
import {RenderExchangePage} from "./ExchangePage/index"

const portfolio: Portfolio = {
    BTC: 1234.78,
    ETH: 3128.50,
    USD: 9405 
}


render(<RenderExchangePage portfolio={portfolio} />, document.getElementById("root"))