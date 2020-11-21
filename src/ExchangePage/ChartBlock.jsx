import React, { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, } from 'recharts';

// async function getBitcoinPriceForToWeeks() {
//     const bitcoinChart = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14").then(response => response.json())
//     return bitcoinChart
// }
// async function getEthereumPriceForToWeeks() {
//     const ethereumChart = await fetch("https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=14").then(response => response.json())
//     return ethereumChart
// }
export class ChartBlock extends React.Component {
    render() {
        const data1 =
        [
                [
                    1605823081220,
                    472.0742603333969
                ],
                [
                    1605823495841,
                    472.6473456639813
                ],
                [
                    1605823824785,
                    471.6634582291065
                ],
                [
                    1605824124348,
                    472.72281040905904
                ],
                [
                    1605824437559,
                    473.0880487014782
                ],
                [
                    1605824670130,
                    472.8914332082141
                ],
                [
                    1605824966803,
                    472.9830314513829
                ],
                [
                    1605825164369,
                    473.0228055948208
                ],
                [
                    1605825623170,
                    472.5901212224061
                ],
                [
                    1605825897872,
                    472.9958997355686
                ],
                [
                    1605826199970,
                    473.1736410828137
                ],
                [
                    1605826474737,
                    472.81214420106403
                ],
                [
                    1605826763618,
                    472.45894815606664
                ],
                [
                    1605826909912,
                    472.14758514126385
                ],
                [
                    1605827329578,
                    471.85127606569966
                ]
            ]
        const createData = (data1) => {
            let data = []
            data1.forEach((priceForOnDay ,index) => {
                const element = {
                    "name": index,
                    "bitcoin": priceForOnDay[1]
                }
                console.log(element.bitcoin)
                data.push(element)
            })
            return data
        }
        const data = createData(data1)
        return (
            <CreateChart data={data}/>
        )
    }
}

const CreateChart = (data) => {
    const [btcPrices, setBtcPrices] = useState([])
    const [ethPrices, setEthPrices] = useState({})

    // getBitcoinPriceForToWeeks().then(response => {
    //     setBtcPrices(response)
    //     // console.log(btcPrices)
    // })
    // getEthereumPriceForToWeeks().then(response => {
    //     setEthPrices(response)
    //     // console.log(ethPrices)
    // })

    // const createData = (inputData) => {
    //     let data = []
    //     inputData.forEach((priceForOnDay ,index) => {
    //         const element = {
    //             "name": index,
    //             "bitcoin": priceForOnDay[1]
    //         }
    //         console.log(element.bitcoin)
    //         data.push(element)
    //     })
    //     setBtcPrices(data)
    // }
    
    // createData(data)
    

    // const data1 = [
    //     {
    //         "name": "Page A",
    //         "uv": 4000,
    //         "pv": 2400,
    //         "amt": 2400
    //     },
    //     {
    //         "name": "Page B",
    //         "uv": 3000,
    //         "pv": 1398,
    //         "amt": 2210
    //     },
    //     {
    //         "name": "Page C",
    //         "uv": 2000,
    //         "pv": 9800,
    //         "amt": 2290
    //     },
    //     {
    //         "name": "Page D",
    //         "uv": 2780,
    //         "pv": 3908,
    //         "amt": 2000
    //     },
    //     {
    //         "name": "Page E",
    //         "uv": 1890,
    //         "pv": 4800,
    //         "amt": 2181
    //     },
    //     {
    //         "name": "Page F",
    //         "uv": 2390,
    //         "pv": 3800,
    //         "amt": 2500
    //     },
    //     {
    //         "name": "Page G",
    //         "uv": 3490,
    //         "pv": 4300,
    //         "amt": 2100
    //     }
    // ]
    return (
        <LineChart width={730} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
    )
}