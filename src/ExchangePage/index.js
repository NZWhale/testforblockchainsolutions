import React from 'react';
import {CurrencyBlock} from "./CurrencyBlock"
import {PieCryptoChart} from "./PieCryptoChart"


export class RenderExchangePage extends React.Component{
    render() {
        const props = this.props
        const portfolio = props.portfolio
        return(
        <div>
            <CurrencyBlock portfolio={portfolio} />
            <PieCryptoChart portfolio={portfolio} />
        </div>
    )
}
}