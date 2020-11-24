import getInstance, { PortfolioState } from "../PortfolioState";
import React from 'react';
import { style } from "typestyle";

export class TotalAmount extends React.Component {
    interval!: NodeJS.Timer
    portfolioInstance = getInstance()
    state = {
        totalAmount: 0,
        btcInUsd: 0,
        ethInUsd: 0
    }
    componentDidMount() {
        this.getTotalAmount()
        this.interval = setInterval(() => this.getTotalAmount(), 1000)
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    getTotalAmount() {
        this.getBtcAmountInUsd()
            .then(() => this.getEthAmountInUsd())
            .then(() => {
                this.setState({ totalAmount: (this.state.btcInUsd + this.state.ethInUsd + this.portfolioInstance.getAmount("USD")).toFixed(2) })
            })
    }

    async getBtcAmountInUsd() {
        const resp = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd").then(response => response.json())
        const btcAmount = this.portfolioInstance.getAmount("BTC")
        const btcInUsd = (resp.bitcoin.usd) * btcAmount
        this.setState({ btcInUsd: btcInUsd })
    }
    async getEthAmountInUsd() {
        const resp = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd").then(response => response.json())
        const ethAmount = this.portfolioInstance.getAmount("ETH")
        const ethInUsd = (resp.ethereum.usd) * ethAmount
        this.setState({ ethInUsd: ethInUsd })
    }
    render() {
        return (
            <div className={style({ 
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                borderBottom: "1px solid rgb(0 0 0 / 25%)",
                marginLeft: "57%"
            })}>
               {"Total amount:"} {this.state.totalAmount} {"$"}
            </div>
        )
    }
}