import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { InputGroupState } from "./InputGroupState"


export class ExchangeBlock extends React.Component {

    render() {
        const portfolio = this.props.portfolio

        return (
            <div>
                <InputGroup portfolio={portfolio} />
            </div>
        )
    }
}

async function getCoinsPrice() {
    const coinsPrices = {
        btc: "",
        eth: "",
    }
    const bitcoinPrice = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd").then(response => response.json())
    const ethereumPrice = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd").then(response => response.json())
    coinsPrices.btc = bitcoinPrice.bitcoin.usd
    coinsPrices.eth = ethereumPrice.ethereum.usd
    return coinsPrices
}


const InputGroup = (portfolio) => {
    const [isFromOpen, setFromDropdownAreaState] = useState(false)
    const [isToOpen, setToDropdownAreaState] = useState(false)
    const [typeOfInput, setTypeOfInput] = useState("")
    const [typeOfOutput, setTypeOfOutput] = useState("")
    const [inputAmount, setInputAmount] = useState("")
    const [outputAmount, setOutputAmount] = useState("")
    const [btcPrice, setBtcPrice] = useState("")
    const [ethPrice, setEthPrice] = useState("")

    const btcIconUrl = "https://i-invdn-com.akamaized.net/ico_flags/80x80/v32/bitcoin.png"
    const ethIconUrl = "https://i-invdn-com.akamaized.net/ico_flags/80x80/v32/ethereum.png"
    const dollarIconUrl = "https://www.flaticon.com/svg/static/icons/svg/262/262280.svg"

    getCoinsPrice().then(response => {
        // let coins = {
        //     BTC: `${response.btc}`,
        //     ETH: `${response.eth}`
        // }
        // coinsPrice = coins
        setBtcPrice(response.btc)
        setEthPrice(response.eth)
        console.log(btcPrice, ethPrice)
    })


    const currencyIcon = (url) => {
        return `<img height="21px" src=${url} alt="" />`
    }

    const setFromDropdownAreaCurrency = (url, currencyName) => {
        const currencyDropdown = document.getElementById("currencyFrom")
        const currencyIco = currencyIcon(url)
        currencyDropdown.innerHTML = currencyIco
        setTypeOfInput(currencyName)
        setFromDropdownAreaState(false)
    }

    const setToDropdownAreaCurrency = (url, currencyName) => {
        const currencyDropdown = document.getElementById("currencyTo")
        const currencyIco = currencyIcon(url)
        currencyDropdown.innerHTML = currencyIco
        setToDropdownAreaState(false)
        setTypeOfOutput(currencyName)
    }

    const fantomExchange = (event) => {
        setInputAmount(event.target.value)
        if (typeOfInput === "BTC" && typeOfOutput === "ETH") {
            const ethAmout = (inputAmount * btcPrice) / ethPrice
            setOutputAmount(ethAmout)
        }
        if (typeOfInput === "BTC" && typeOfOutput === "USD") {
            const usdAmout = inputAmount * btcPrice
            setOutputAmount(usdAmout)
        }
        if (typeOfInput === "ETH" && typeOfOutput === "BTC") {
            const btcAmount = (inputAmount * ethPrice) / btcPrice
            setOutputAmount(btcAmount)
        }
        if (typeOfInput === "ETH" && typeOfOutput === "USD") {
            const usdAmount = inputAmount * ethPrice 
            setOutputAmount(usdAmount)
        }
    }

    return (
        <div className="input-group mb-3">
            <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" id="inInput" onChange={(event) => fantomExchange(event)} />
            <div className="input-group-prepend dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => setFromDropdownAreaState(!isFromOpen)} id="currencyFrom">Currency</button>
                {isFromOpen &&
                    <div className="dropdown-menu" style={{ display: `${isFromOpen ? 'block' : 'none'}` }}>
                        <div className="dropdown-item" onClick={() => setFromDropdownAreaCurrency(btcIconUrl, "BTC")}><img style={{ height: "24px" }} src={btcIconUrl} alt="" /></div>
                        <div className="dropdown-item" onClick={() => setFromDropdownAreaCurrency(ethIconUrl, "ETH")}><img style={{ height: "24px" }} src={ethIconUrl} alt="" /></div>
                        <div className="dropdown-item" onClick={() => setFromDropdownAreaCurrency(dollarIconUrl, "USD")}><img style={{ height: "24px" }} src={dollarIconUrl} alt="" /></div>
                    </div>
                }
            </div>
            <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" value={outputAmount} onChange={(event) => setOutputAmount(event.target.value)} id="outInput" />
            <div className="input-group-prepend dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => setToDropdownAreaState(!isFromOpen)} id="currencyTo">Currency</button>
                {isToOpen &&
                    <div className="dropdown-menu" style={{ display: `${isToOpen ? 'block' : 'none'}` }}>
                        <div className="dropdown-item" onClick={() => setToDropdownAreaCurrency(btcIconUrl, "BTC")}><img style={{ height: "24px" }} src={btcIconUrl} alt="" /></div>
                        <div className="dropdown-item" onClick={() => setToDropdownAreaCurrency(ethIconUrl, "ETH")}><img style={{ height: "24px" }} src={ethIconUrl} alt="" /></div>
                        <div className="dropdown-item" onClick={() => setToDropdownAreaCurrency(dollarIconUrl, "USD")}><img style={{ height: "24px" }} src={dollarIconUrl} alt="" /></div>
                    </div>
                }
            </div>
            <button className="btn btn-outline-secondary" type="button" id="button-addon1" style={{ width: "150%" }} onClick={() => fantomExchange()}>Exchange</button>
        </div>
    )
}