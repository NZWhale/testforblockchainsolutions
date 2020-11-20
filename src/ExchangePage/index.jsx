import React from 'react';
import {ExchangeBlock} from "./ExchangeBlock"
import {ChartBlock} from "./ChartBlock"
import {ChangePageButton} from "../ChangePageButton"

export class ExchangePage extends React.Component {
    render() {
        const portfolio = this.props.portfolio
        return (
            <div className="container-fluid">
                <ChangePageButton />
                <ExchangeBlock portfolio={portfolio} />
                {/* <ChartBlock portfolio={portfolio} /> */}
            </div>
        )
    }
}