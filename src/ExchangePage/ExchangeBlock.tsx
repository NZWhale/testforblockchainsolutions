import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import getInstance, { PortfolioState } from '../PortfolioState';
import { style } from "typestyle";
import bitcoin from "./bitcoin.png"
import ethereum from "./ethereum.png"
import dollar from "./dollar.svg"
import { SyntheticEvent } from 'react';



export class ExchangeBlock extends React.Component {
    portfolioInstance: PortfolioState = getInstance()
    render() {
        return (
            <>
                <InputGroup portfolioInstance={this.portfolioInstance} />
            </>
        )
    }
}
interface InputGroupProps {
    portfolioInstance: PortfolioState
}


interface State {
    currencyFrom: Currency;
    currencyFromIcon: string;
    currencyTo: Currency;
    currencyToIcon: string;
    amountFrom: number;
    amountTo: number;
    btcRate: number;
    ethRate: number;
    isFromCurrencyFormOpen: boolean;
    isToCurrencyFormOpen: boolean;
    error: null,
}
interface InputProps {
    state: State
    portfolioInstance: PortfolioState
    currency: Currency
    amount: number
    isFromCurrencyFormOpen: boolean
    isToCurrencyFormOpen: boolean
    currencyFromIcon: string
    currencyToIcon: string
    setFromFormState: () => void
    setToFormState: () => void
    onCurrencyChange?: (Currency: Currency) => void
    onChange?: (event: SyntheticEvent) => void
    onClick: (Currency: Currency, type: string) => void
    placeholder?: number
}

type Currency = "USD" | "BTC" | "ETH"


class InputGroup extends React.Component {
    props: InputGroupProps = this.props
    portfolio: PortfolioState = this.props.portfolioInstance
    btcIconUrl = bitcoin
    ethIconUrl = ethereum
    dollarIconUrl = dollar
    state: State = {
        currencyFrom: "BTC",
        currencyFromIcon: bitcoin,
        currencyTo: "USD",
        currencyToIcon: dollar,
        amountFrom: 0,
        amountTo: 0,
        btcRate: 0,
        ethRate: 0,
        isFromCurrencyFormOpen: false,
        isToCurrencyFormOpen: false,
        error: null,
    }
    updateIntervalId = undefined

    exchange() {
        if (this.state.currencyFrom === "BTC") {
            this.portfolio.minusBtcAmount(this.state.amountFrom)
            if (this.portfolio.getAmount("BTC") > 0) {
                if (this.state.currencyTo === "ETH") this.portfolio.addEthAmount(this.state.amountTo)
                if (this.state.currencyTo === "USD") this.portfolio.addUsdAmount(this.state.amountTo)
                this.setState({ amountFrom: 0 })
                this.setState({ amountTo: 0 })
            }
        } else if (this.state.currencyFrom === "ETH") {
            this.portfolio.minusEthAmount(this.state.amountFrom)
            if (this.portfolio.getAmount("ETH") > 0) {
                if (this.state.currencyTo === "BTC") this.portfolio.addBtcAmount(this.state.amountTo)
                if (this.state.currencyTo === "ETH") this.portfolio.addEthAmount(this.state.amountTo)
                this.setState({ amountFrom: 0 })
                this.setState({ amountTo: 0 })
            }
        } else if (this.state.currencyFrom === "USD") {
            if (this.state.currencyTo === "BTC") {
                if (this.portfolio.getAmount("USD") / this.state.btcRate > 1) {
                    this.portfolio.minusUsdAmount(this.state.amountFrom)
                    this.portfolio.addBtcAmount(this.state.amountTo)
                    this.setState({ amountFrom: 0 })
                    this.setState({ amountTo: 0 })
                } else { alert("Not enough funds") }
            } else if (this.state.currencyTo === "ETH") {
                if (this.portfolio.getAmount("USD") / this.state.ethRate > 1) {
                    this.portfolio.addEthAmount(this.state.amountTo)
                    this.portfolio.minusUsdAmount(this.state.amountFrom)
                    this.setState({ amountFrom: 0 })
                    this.setState({ amountTo: 0 })
                } else { alert("Not enough funds") }
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.updateIntervalId)
    }
    componentDidMount() {
        this.updateCurrencyRate()
    }
    updateCurrencyRate() {
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
            .then(response => response.json())
            .then((data) => { this.setState({ btcRate: parseFloat(data.bitcoin.usd) }) })
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
            .then(response => response.json())
            .then((data) => { this.setState({ ethRate: parseFloat(data.ethereum.usd) }) })
    }

    setCurrencyAndIconState = (currency: Currency, typeOfInput: string) => {
        if (typeOfInput === "from") {
            if (currency === "BTC") {
                this.setState({ currencyFrom: "BTC" })
                this.setState({ currencyFromIcon: this.btcIconUrl })
                this.setState({ isFromCurrencyFormOpen: false })

            }
            if (currency === "ETH") {
                this.setState({ currencyFrom: "ETH" })
                this.setState({ currencyFromIcon: this.ethIconUrl })
                this.setState({ isFromCurrencyFormOpen: false })

            }
            if (currency === "USD") {
                this.setState({ currencyFrom: "USD" })
                this.setState({ currencyFromIcon: this.dollarIconUrl })
                this.setState({ isFromCurrencyFormOpen: false })

            }
        } else if (typeOfInput === "to") {
            if (currency === "BTC") {
                this.setState({ currencyTo: "BTC" })
                this.setState({ currencyToIcon: this.btcIconUrl })
                this.setState({ isToCurrencyFormOpen: false })
            }
            if (currency === "ETH") {
                this.setState({ currencyTo: "ETH" })
                this.setState({ currencyToIcon: this.ethIconUrl })
                this.setState({ isToCurrencyFormOpen: false })
            }
            if (currency === "USD") {
                this.setState({ currencyTo: "USD" })
                this.setState({ currencyToIcon: this.dollarIconUrl })
                this.setState({ isToCurrencyFormOpen: false })
            }
        }
    }

    setExchangedAmount = () => {
        if (this.state.currencyFrom === "BTC" && this.state.currencyTo === "USD") {
            const result = (this.state.amountFrom * this.state.btcRate) / 1
            this.setState({ amountTo: result })
        }
        if (this.state.currencyFrom === "BTC" && this.state.currencyTo === "ETH") {
            const result = (this.state.amountFrom * this.state.btcRate) / this.state.ethRate
            this.setState({ amountTo: result })
        }
        if (this.state.currencyFrom === "ETH" && this.state.currencyTo === "USD") {
            const result = (this.state.amountFrom * this.state.ethRate) / 1
            this.setState({ amountTo: result })
        }
        if (this.state.currencyFrom === "ETH" && this.state.currencyTo === "BTC") {
            const result = (this.state.amountFrom * this.state.ethRate) / this.state.btcRate
            this.setState({ amountTo: result })
        }
        if (this.state.currencyFrom === "USD" && this.state.currencyTo === "BTC") {
            const result = (this.state.amountFrom * 1) / this.state.btcRate
            this.setState({ amountTo: result })
        }
        if (this.state.currencyFrom === "USD" && this.state.currencyTo === "ETH") {
            const result = (this.state.amountFrom * 1) / this.state.ethRate
            this.setState({ amountTo: result })
        }
        if (this.state.currencyFrom === "USD" && this.state.currencyTo === "USD") {
            const result = this.state.amountFrom
            this.setState({ amountTo: result })
        }
        if (this.state.currencyFrom === "BTC" && this.state.currencyTo === "BTC") {
            const result = this.state.amountFrom
            this.setState({ amountTo: result })
        }
        if (this.state.currencyFrom === "ETH" && this.state.currencyTo === "ETH") {
            const result = this.state.amountFrom
            this.setState({ amountTo: result })
        }
    }


    render() {
        return (
            <>
                <div>
                    <Input
                        state={this.state}
                        portfolioInstance={this.props.portfolioInstance}
                        currency={this.state.currencyFrom}
                        amount={this.state.amountFrom}
                        setFromFormState={() => {
                            if (this.state.isToCurrencyFormOpen) this.setState({ isToCurrencyFormOpen: false })
                            this.setState({ isFromCurrencyFormOpen: !this.state.isFromCurrencyFormOpen })
                            console.log(this.state.isFromCurrencyFormOpen)
                        }}
                        setToFormState={() => {
                            if (this.state.isFromCurrencyFormOpen) this.setState({ isFromCurrencyFormOpen: false })
                            this.setState({ isToCurrencyFormOpen: !this.state.isToCurrencyFormOpen })
                        }}
                        currencyFromIcon={this.state.currencyFromIcon}
                        currencyToIcon={this.state.currencyToIcon}
                        isToCurrencyFormOpen={this.state.isToCurrencyFormOpen}
                        isFromCurrencyFormOpen={this.state.isFromCurrencyFormOpen}
                        onChange={(event) => {
                            let target = event.target as HTMLInputElement
                            if(target.value != ""){
                            let value = parseFloat(target.value)
                            this.setState({ amountFrom: value }, () => {
                                this.updateCurrencyRate()
                                this.setExchangedAmount()
                            })
                        } else { 
                            this.setState({ amountFrom: 0 }, () => {
                                this.updateCurrencyRate()
                                this.setExchangedAmount()
                            })
                        }
                        }}
                        onClick={(currency, form) => {
                            this.setCurrencyAndIconState(currency, form)
                        }}
                        placeholder={this.state.amountTo}
                    />
                    <Button
                        label="exchange"
                        buttonType="secondary"
                        exchange={() => this.exchange()}
                    />
                </div>
            </>
        )
    }
}


class Input extends React.Component {
    props: InputProps = this.props
    btcIconUrl = bitcoin
    ethIconUrl = ethereum
    dollarIconUrl = dollar

    returnIcon = (currency: Currency) => {
        if (currency === "BTC") return this.btcIconUrl
        if (currency === "ETH") return this.ethIconUrl
        if (currency === "USD") return this.dollarIconUrl
    }





    render() {
        return (
            <>
                <div>
                    <div className={style({ display: "flex", flexDirection: "row", justifyContent: "center" })}>
                        <input className="form-control" placeholder="From" onChange={this.props.onChange}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            onClick={this.props.setFromFormState}
                            style={{ marginBottom: "12px", marginLeft: "5px", height: "38px" }}>
                            <img src={this.props.currencyFromIcon} style={{ width: "24px" }} alt="" />
                        </button>
                    </div>
                    {this.props.isFromCurrencyFormOpen &&
                        <div className={style({ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginBottom: "12px" })}>
                            <div ><img onClick={() => this.props.onClick("BTC", "from")} style={{ height: "24px" }} src={this.btcIconUrl} alt="" /></div>
                            <div ><img onClick={() => this.props.onClick("ETH", "from")} style={{ height: "24px" }} src={this.ethIconUrl} alt="" /></div>
                            <div ><img onClick={() => this.props.onClick("USD", "from")} style={{ height: "24px" }} src={this.dollarIconUrl} alt="" /></div>
                        </div>
                    }

                    <div>
                        <div className={style({ display: "flex", flexDirection: "row", justifyContent: "center" })}>
                            <input className="form-control" placeholder={`${this.props.placeholder}` === "0" ? "To" : `${this.props.placeholder}`} />
                            <button
                                className="btn btn-outline-secondary"
                                onClick={this.props.setToFormState}
                                style={{ marginBottom: "12px", marginLeft: "5px", height: "38px" }}>
                                <img src={this.props.currencyToIcon} style={{ width: "24px" }} alt="" />
                            </button>
                        </div>
                        {this.props.isToCurrencyFormOpen &&
                            <div className={style({ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginBottom: "12px" })}>
                                <div ><img onClick={() => this.props.onClick("BTC", "to")} style={{ height: "24px" }} src={this.btcIconUrl} alt="" /></div>
                                <div ><img onClick={() => this.props.onClick("ETH", "to")} style={{ height: "24px" }} src={this.ethIconUrl} alt="" /></div>
                                <div ><img onClick={() => this.props.onClick("USD", "to")} style={{ height: "24px" }} src={this.dollarIconUrl} alt="" /></div>
                            </div>
                        }

                    </div>
                </div>
            </>

        )
    }
}
type ButtonType = "primary" | "secondary"
interface ButtonProps {
    label: string;
    buttonType?: ButtonType;
    exchange: () => void
}

class Button extends React.Component {
    props: ButtonProps = this.props
    render() {
        return (
            <button
                className={`btn btn-outline-${this.props.buttonType || "secondary"}`}
                type="button"
                style={{ width: "100%" }}
                onClick={this.props.exchange}>{this.props.label}
            </button>
        )
    }
}



