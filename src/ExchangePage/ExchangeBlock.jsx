// import React, { useState } from 'react';
// import "bootstrap/dist/css/bootstrap.css";
// import { InputGroupState } from "./InputGroupState"


// export class ExchangeBlock extends React.Component {
//     render() {
//         return (
//             <div>
//                 <InputGroup portfolio={portfolio} />
//             </div>
//         )
//     }
// }

// async function getCoinsPrice() {
//     const coinsPrices = {
//         btc: "",
//         eth: "",
//     }
//     const bitcoinPrice = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd").then(response => response.json())
//     const ethereumPrice = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd").then(response => response.json())
//     coinsPrices.btc = bitcoinPrice.bitcoin.usd
//     coinsPrices.eth = ethereumPrice.ethereum.usd
//     return coinsPrices
// }

// // type Currency = "USD" | "BTC" | "ETH"
// // const convertCurrency = (currencyFrom: Currency, currencyTo: Currency, amount: number): number

// interface ExchangeTransaction {
//     currencyFrom: Currency;
//     currencyTo: Currency;
//     targetCurrencyRate: number;
//     exchangeAmount: number;
// }

// class InputGroup extends Component {
//     state = {
//         currencyFrom: 'USD',
//         currencyTo: 'BTC',
//         amountFrom: 0,
//         amountTo: 0,
//         currencyRate: 0,
//         isFromCurrencyFormOpen: false,
//         isToCurrencyFormOpen: false,
//         error: null,
//     }

//     updateIntervalId = null

//     // componentDidMount() {
//     //     this.updateIntervalId = setInterval(() => {

//     //     }, 2000);
//     // }

//     // componentWillUnmount() {
//     //     clearInterval(this.updateIntervalId)
//     // }

//     componentDidMount() {
//         this.updateCurrencyRate()
//     }

//     openForm(formType) {

//     }

//     updateCurrencyRate() {
//         this.setState({
//             ...this.setState,
//             pending: true
//         }, () => {
//             fetchBla().then((newCurrencyRate) => {
//                 this.setState({
//                     currencyRate: newCurrencyRate
//                 }, () => {
//                     this.setState({
//                         ...this.setState,
//                         pending: true
//                     })
//                 })
//             })
//         })
//     }

//     render() {
//         return (
//             <>
//                 <Input
//                     currency={this.state.currencyFrom}
//                     amount={this.state.amountFrom}
//                     onCurrencyChange={(newCurrency) => {
//                         this.setState({
//                             currencyFrom: newCurrency
//                         }, () => {
//                             this.updateCurrencyRate()
//                         })
//                     }}
//                     onAmountChange={(newAmount) => {
//                         this.setState({
//                             ...this.state,
//                             amountFrom: newAmount,
//                             amountTo: convertCurrency(currencyFrom, currencyTo, newAmount)
//                         })
//                     }}
//                 />
//                 <Input
//                     currency={this.state.currencyTo}
//                     amount={this.state.amountTo}
//                     isFromCurrencyFormOpen={this.state.isFromCurrencyFormOpen}
//                     onAmountChange={(newAmount) => {
//                         this.setState({
//                             ...this.state,
//                             amountTo: newAmount,
//                             amountFrom: convertCurrency(currencyFrom, currencyTo, newAmount)
//                         })
//                     }}
//                 />
//                 <Button onClick={() => {
//                     try {
//                         this.setState({
//                             ...this.state,
//                             pending: true,
//                         })
//                         const btcPrice = await fetchBtcProce();
//                         modelInstance.exchangeCurrency(currencyFrom, currencyTo, newAmount);
//                         // ok scenario
//                     } catch (e) {
//                         this.setState({
//                             ...this.state,
//                             error: e.message
//                         })
//                     }
//                 }} />
//             </>
//         )
//     }
// }


// class Input {
//     render() {
//         currency = this.props.currency
//         amount = this.props.amount
//         return (
//             <div>
//                 <input />
//                 <div onClick={() => openForm()}></div>
//                 {isFromCurrencyFormOpen &&
//                     <div className="dropdown-menu" style={{ display: `${isToOpen ? 'block' : 'none'}` }}>
//                         <div className="dropdown-item" onClick={event => this.props.onCurrencyChange(event.value)}><img style={{ height: "24px" }} src={btcIconUrl} alt="" /></div>
//                         <div className="dropdown-item" onClick={event => this.props.onCurrencyChange(event.value)}><img style={{ height: "24px" }} src={ethIconUrl} alt="" /></div>
//                         <div className="dropdown-item" onClick={event => this.props.onCurrencyChange(event.value)}><img style={{ height: "24px" }} src={dollarIconUrl} alt="" /></div>
//                     </div>
//                 }
//             </div>
//         )
//     }
// }

// const InputGroup = (portfolio) => {
//     const [isFromOpen, setFromDropdownAreaState] = useState(false)
//     const [isToOpen, setToDropdownAreaState] = useState(false)
//     const [currencyFrom, setCurrencyFrom] = useState("")
//     const [currencyTo, setCurrencyTo] = useState("")
//     const [inputAmount, setInputAmount] = useState("")
//     const [outputAmount, setOutputAmount] = useState("")
//     const [btcPrice, setBtcPrice] = useState("")
//     const [ethPrice, setEthPrice] = useState("")

//     const btcIconUrl = "https://i-invdn-com.akamaized.net/ico_flags/80x80/v32/bitcoin.png"
//     const ethIconUrl = "https://i-invdn-com.akamaized.net/ico_flags/80x80/v32/ethereum.png"
//     const dollarIconUrl = "https://www.flaticon.com/svg/static/icons/svg/262/262280.svg"

//     getCoinsPrice().then(response => {
//         setBtcPrice(response.btc)
//         setEthPrice(response.eth)
//         console.log(btcPrice, ethPrice)
//     })


//     const currencyIcon = (url) => {
//         return `<img height="21px" src=${url} alt="" />`
//     }

//     const setFromDropdownAreaIcon = (url, currencyName) => {
//         const currencyDropdown = document.getElementById("currencyFrom")
//         const currencyIco = currencyIcon(url)
//         currencyDropdown.innerHTML = currencyIco
//         setCurrencyFrom(currencyName)
//         setFromDropdownAreaState(false)
//     }

//     const setToDropdownAreaIcon = (url, currencyName) => {
//         const currencyDropdown = document.getElementById("currencyTo")
//         const currencyIco = currencyIcon(url)
//         currencyDropdown.innerHTML = currencyIco
//         setToDropdownAreaState(false)
//         setCurrencyTo(currencyName)
//     }

//     const fantomExchange = (event) => {
//         setInputAmount(event.target.value)
//         const outInput = document.getElementById("outInput")
//         if (currencyFrom === "BTC" && currencyTo === "ETH") {
//             const ethAmout = (inputAmount * btcPrice) / ethPrice
//             setOutputAmount(ethAmout)
//             outInput.value = ethAmout
//         }
//         if (currencyFrom === "BTC" && currencyTo === "USD") {
//             const usdAmount = inputAmount * btcPrice
//             setOutputAmount(usdAmount)
//             outInput.value = usdAmount
//         }
//         if (currencyFrom === "ETH" && currencyTo === "BTC") {
//             const btcAmount = (inputAmount * ethPrice) / btcPrice
//             setOutputAmount(btcAmount)
//             outInput.value = btcAmount
//         }
//         if (currencyFrom === "ETH" && currencyTo === "USD") {
//             const usdAmount = inputAmount * ethPrice
//             setOutputAmount(usdAmount)
//             outInput.value = usdAmount
//         }
//     }

//     return (
//         <div className="input-group mb-3">
//             <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" id="inInput" onChange={event => fantomExchange(event)} />
//             <div className="input-group-prepend dropdown">
//                 <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => setFromDropdownAreaState(!isFromOpen)} id="currencyFrom">Currency</button>
//                 {isFromOpen &&
//                     <div className="dropdown-menu" style={{ display: `${isFromOpen ? 'block' : 'none'}` }}>
//                         <div className="dropdown-item" onClick={() => setFromDropdownAreaIcon(btcIconUrl, "BTC")}><img style={{ height: "24px" }} src={btcIconUrl} alt="" /></div>
//                         <div className="dropdown-item" onClick={() => setFromDropdownAreaIcon(ethIconUrl, "ETH")}><img style={{ height: "24px" }} src={ethIconUrl} alt="" /></div>
//                         <div className="dropdown-item" onClick={() => setFromDropdownAreaIcon(dollarIconUrl, "USD")}><img style={{ height: "24px" }} src={dollarIconUrl} alt="" /></div>
//                     </div>
//                 }
//             </div>
//             <input type="text" className="form-control" aria-label="Text input with segmented dropdown button" value={outputAmount} onChange={(event) => setOutputAmount(event.target.value)} id="outInput" />
//             <div className="input-group-prepend dropdown">
//                 <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => setToDropdownAreaState(!isFromOpen)} id="currencyTo">Currency</button>
//                 {isToOpen &&
//                     <div className="dropdown-menu" style={{ display: `${isToOpen ? 'block' : 'none'}` }}>
//                         <div className="dropdown-item" onClick={() => setToDropdownAreaIcon(btcIconUrl, "BTC")}><img style={{ height: "24px" }} src={btcIconUrl} alt="" /></div>
//                         <div className="dropdown-item" onClick={() => setToDropdownAreaIcon(ethIconUrl, "ETH")}><img style={{ height: "24px" }} src={ethIconUrl} alt="" /></div>
//                         <div className="dropdown-item" onClick={() => setToDropdownAreaIcon(dollarIconUrl, "USD")}><img style={{ height: "24px" }} src={dollarIconUrl} alt="" /></div>
//                     </div>
//                 }
//             </div>
//             <button className="btn btn-outline-secondary" type="button" id="button-addon1" style={{ width: "150%" }} onClick={() => fantomExchange()}>Exchange</button>
//         </div>
//     )
// }