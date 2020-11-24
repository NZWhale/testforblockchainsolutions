import React from 'react';
import { AreaChart, CartesianGrid, XAxis, YAxis, Area, Tooltip, } from 'recharts';

interface Element {
    name: string
    bitcoin: number
    ethereum?: number
}
interface State {
    data: Array<object>
}

export class ChartBlock extends React.Component {
    interval!: NodeJS.Timer
    state: State = {
        data: []
    }
    async getMarketPriceForTwoWeeks(currency: string) {
        const twoWeeksTimestamp = 1209600
        const currentTimestamp = Math.round(new Date().getTime()/1000.0)
        const firstDayTimestamp = currentTimestamp - twoWeeksTimestamp
        const url = `https://api.coingecko.com/api/v3/coins/${currency}/market_chart/range?vs_currency=usd&from=${firstDayTimestamp}&to=${currentTimestamp}`
        const response = await fetch(url)
        const data = await response.json()
        const prices = data.prices
        return prices
    }
    async setPricesInState() {
        let btcPrices = await this.getMarketPriceForTwoWeeks("bitcoin")
        let ethPrices = await this.getMarketPriceForTwoWeeks("ethereum")
        let data = this.createData(btcPrices, ethPrices)
        this.setState({ data: data})
    }
    componentDidMount() {
        this.setPricesInState()
        this.interval = setInterval(() => this.setPricesInState(), 60000)
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    createData = (btcData: number[][], ethData: number[][]) => {
        let data: Array<Element> = []
        btcData.forEach((priceForOneDay) => {
            let date = new Date(priceForOneDay[0])
            const element: Element = {
                "name": `${date.getDate() + "." + date.getMonth()}`,
                "bitcoin": priceForOneDay[1],
                "ethereum": 0
            }
            data.push(element)
        })
        data.forEach((element, index) => {
            if(index+1 > ethData.length) {
                return
            } else {
            element.ethereum = ethData[index][1]
            console.log(element)
            }
        })
        console.log(data)
        return data
    }

    render() {
        return (
            <CreateChart data={this.state.data} />
        )
    }
}
interface CreateChart {
    data: any
}

class CreateChart extends React.Component {
    props: any = this.props
    render() {
        return (
            <>
            <AreaChart syncId="bitcoin" width={500} height={250} data={this.props.data}
                margin={{ top: 0, right: 60, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="bitcoin" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
            <AreaChart syncId="ethereum" width={500} height={250} data={this.props.data}
            margin={{ top: 0, right: 60, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="ethereum" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
        </>
        )
    }
}