import React from 'react';
import {ExchangeBlock} from "./ExchangeBlock"
import {ChartBlock} from "./ChartBlock"
import {ChangePageButton} from "../ChangePageButton"
import { style } from 'typestyle';

export class ExchangePage extends React.Component {
    render() {
        const portfolio = this.props.portfolio
        return (
            <div className={style({
                width: "500px"
            })}>
                <ChangePageButton />
                <ExchangeBlock portfolio={portfolio} />
                <ChartBlock portfolio={portfolio} />
            </div>
        )
    }
}