import React from 'react';
import Portfolio from "./CurrencyBlock"
import { PieChartBlock } from "./PieChartBlock"
import {ChangePageButton} from "../ChangePageButton"
 import {style} from "typestyle"

export class PortfolioPage extends React.Component {
    render() {
        const props = this.props
        const portfolio = props.portfolio
        return (
            <div className={style({
                width: "500px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column-reverse",
                alignItems: "center",
                height: "100%",
            })}>
                <Portfolio portfolio={portfolio} />
                <PieChartBlock portfolio={portfolio} />
            </div>
        )
    }
}