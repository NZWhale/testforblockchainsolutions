import React, { PureComponent } from 'react';
import { PieChart, Pie, Tooltip, } from 'recharts';

export class PieChartBlock extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/k9jkog04/';

    render() {
        const props = this.props
        const portfolio = props.portfolio
        let data = []
        Object.entries(portfolio).forEach(currencyCost => {
            const currencyData = {
                "name": currencyCost[0],
                "value": currencyCost[1]
            }
            data.push(currencyData)
        })
        console.log(data)
        return (
            <PieChart width={400} height={400}>
                <Pie dataKey="value" isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
                <Pie dataKey="value" data={data} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
                <Tooltip />
            </PieChart>
        );
    }
}
