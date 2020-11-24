import React, { PureComponent } from 'react';
import { PieChart, Pie, Tooltip, } from 'recharts';
import getInstance, { PortfolioState } from '../PortfolioState';

export class PieChartBlock extends PureComponent {
    interval!: NodeJS.Timeout
    state = {
        ethInUsd: "",
        btcInUsd: "",
        data: []
    }

    setDataValues() {
    this.interval = setInterval(() => this.getBtcAmountInUsd()
    .then(() => this.getEthAmountInUsd())
    .then(() => {this.setState({
        data: [
            {
                "name": "BTC",
                "value": this.state.btcInUsd
            },
            {
                "name": "ETH",
                "value": this.state.ethInUsd
            },
            {
                "name": "USD",
                "value": this.portfolioInstance.getCurrencyInUsd("USD")
            }
        ]
    })}), 2000)
}

    componentDidMount() {
    this.setDataValues()
    }

    componentWillMount() {
        clearInterval(this.interval)
    }

    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/k9jkog04/';
    portfolioInstance: PortfolioState = getInstance()

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
            <PieChart width={400} height={400}>
                <Pie dataKey="value" isAnimationActive={true} data={this.state.data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
                <Tooltip />
            </PieChart>
        );
    }
}
