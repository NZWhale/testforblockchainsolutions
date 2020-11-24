import React from 'react';
import Portfolio from "./CurrencyBlock"
import { PieChartBlock } from "./PieChartBlock"
import {ChangePageButton} from "../ChangePageButton"
 import {style} from "typestyle"

export class PortfolioPage extends React.Component {
    render() {
        return (
            <div className={style({
                width: "500px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column-reverse",
                alignItems: "center",
                height: "100%",
            })}>
                <Portfolio  />
                {/* <PieChartBlock portfolio={portfolio} state={this.state}/> */}
            </div>
        )
    }
}