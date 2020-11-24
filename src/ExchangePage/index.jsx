import React from 'react';
import {ExchangeBlock} from "./ExchangeBlock"
import {ChartBlock} from "./ChartBlock"
import {ChangePageButton} from "../ChangePageButton"
import { style } from 'typestyle';

export class ExchangePage extends React.Component {
    render() {

        return (
            <div className={style({
                width: "500px",
                marginTop: "50%",
                height: "100%",
            })}>
                <ChartBlock />
                <ExchangeBlock />
            </div>
        )
    }
}