import React from 'react';
import Portfolio from "./CurrencyBlock"
import {style} from "typestyle"
import { TotalAmount } from "./TotalAmount"


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
            </div>
        )
    }
}

