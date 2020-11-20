import React from 'react';
import { CurrencyBlock } from "./CurrencyBlock"
import { PieCryptoChart } from "./PieCryptoChart"
import {ChangePageButton} from "../ChangePageButton"
 

export class PortfolioPage extends React.Component {
    render() {
        const props = this.props
        const portfolio = props.portfolio
        return (
            <div className="container-fluid">
                <ChangePageButton />
                <CurrencyBlock portfolio={portfolio} />
                <PieCryptoChart portfolio={portfolio} />
            </div>
        )
    }
}