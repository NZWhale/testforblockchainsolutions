import React from 'react';
import { CurrencyBlock } from "./CurrencyBlock"
import { PieChartBlock } from "./PieChartBlock"
import {ChangePageButton} from "../ChangePageButton"
 

export class PortfolioPage extends React.Component {
    render() {
        const props = this.props
        const portfolio = props.portfolio
        return (
            <div className="container-fluid">
                <ChangePageButton />
                <CurrencyBlock portfolio={portfolio} />
                <PieChartBlock portfolio={portfolio} />
            </div>
        )
    }
}