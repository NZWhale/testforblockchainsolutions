import React from 'react';
import { style } from "typestyle";
import getInstance, { PortfolioState } from "../PortfolioState";
import { PieChartBlock } from "./PieChartBlock"
import { TotalAmount } from './TotalAmount';

export default class Portfolio extends React.Component {
    portfolioInstance: PortfolioState = getInstance()
    render() {
        return (
            <div className={style({
                width: "100%",
                $nest: {
                    "&>*": {
                        marginBottom: "12px"
                    },
                    "&>*:last-child": {
                        marginBottom: "0px"
                    }
                }
            })}>
                <TotalAmount />
                <PieChartBlock />
                <CurrencyBlock currency={"BTC"} amount={this.portfolioInstance.getAmount("BTC")} portfolioInstance={this.portfolioInstance} />
                <CurrencyBlock currency={"ETH"} amount={this.portfolioInstance.getAmount("ETH")} portfolioInstance={this.portfolioInstance} />
                <CurrencyBlock currency={"USD"} amount={this.portfolioInstance.getAmount("USD")} portfolioInstance={this.portfolioInstance} />
            </div>

        )
    }

}

type Currency = "BTC" | "ETH" | "USD"

type ButtonType = "primary" | "secondary"

interface ButtonProps {
    onClick: () => void;
    label: string;
    buttonType?: ButtonType;
}
const Button = ({ onClick, label, buttonType }: ButtonProps) => (
    <button className={`btn btn-outline-${buttonType || "secondary"}`} type="button" onClick={onClick}>{label}</button>
)

interface CurrencyBlockProps {
    currency: Currency;
    amount: number;
    portfolioInstance: PortfolioState
}

 const returnIcon = (currency: Currency) => {
    if (currency === "BTC") return btcIconUrl
    if (currency === "ETH") return ethIconUrl
    if (currency === "USD") return dollarIconUrl
}
const btcIconUrl = "src/images/bitcoin.png"
const ethIconUrl = "src/images/ethereum.png"
const dollarIconUrl = "src/images/262280.svg"

const addNewAmount = (currency: Currency, amount: string, portfolioInstance: PortfolioState) => {
    if (currency === "BTC") portfolioInstance.addBtcAmount(parseFloat(amount))
    if (currency === "ETH") portfolioInstance.addEthAmount(parseFloat(amount))
    if (currency === "USD") portfolioInstance.addUsdAmount(parseFloat(amount))
}
const minusAmount = (currency: Currency, amount: string, portfolioInstance: PortfolioState) => {
    if (currency === "BTC") portfolioInstance.minusBtcAmount(parseFloat(amount))
    if (currency === "ETH") portfolioInstance.minusEthAmount(parseFloat(amount))
    if (currency === "USD") portfolioInstance.minusUsdAmount(parseFloat(amount))
}

class CurrencyBlock extends React.Component {
    props: CurrencyBlockProps = this.props
    state = {
        currentAmount: this.props.amount,
        withdrawValue: "",
        topupValue: "",
        isWithdrawOpen: false,
        isTopupOpen: false,
    }


    render() {
        const { isWithdrawOpen, isTopupOpen } = this.state
        return (
            <>
                <div className={style({
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                })} id="button-addon3">
                    <div className="">{this.props.currency}</div>
                    <div className="">{this.state.currentAmount}</div>
                    <div className={style({
                        $nest: {
                            "&>*": {
                                marginLeft: "8px"
                            }
                        }
                    })}>
                        <Button onClick={() => {
                            if (!isTopupOpen && isWithdrawOpen) {
                                this.setState({
                                    isTopupOpen: true,
                                    isWithdrawOpen: false,
                                })
                            } else if (isTopupOpen && !isWithdrawOpen) {
                                this.setState({
                                    isTopupOpen: false,
                                    isWithdrawOpen: false
                                })
                            } else if (!isTopupOpen && !isWithdrawOpen) {
                                this.setState({
                                    isTopupOpen: true,
                                    isWithdrawOpen: false,
                                })
                            }
                        }} label="Top Up" />
                        <Button onClick={() => {
                            if (isTopupOpen && !isWithdrawOpen) {
                                this.setState({
                                    isTopupOpen: false,
                                    isWithdrawOpen: true,
                                })
                            } else if (!isTopupOpen && isWithdrawOpen) {
                                this.setState({
                                    isTopupOpen: false,
                                    isWithdrawOpen: false
                                })
                            } else if (!isTopupOpen && !isWithdrawOpen) {
                                this.setState({
                                    isTopupOpen: false,
                                    isWithdrawOpen: true,
                                })
                            }
                        }} label="Withdraw" />
                    </div>
                </div>

                {isWithdrawOpen &&
                    <div className={style({ width: "90%", display: "flex" })}>
                        <input type="text" onChange={(e) => {
                            this.setState({
                                withdrawValue: e.target.value
                            })
                        }} />
                        <div >
                            <span ><img className={style({ height: "24px", marginRight:"12px" })} src={returnIcon(this.props.currency)} alt="" /></span>
                            <Button onClick={() => {
                                minusAmount(this.props.currency, this.state.withdrawValue, this.props.portfolioInstance)
                                this.setState({
                                    currentAmount: this.props.portfolioInstance.getAmount(this.props.currency),
                                    isWithdrawOpen: false
                                })
                            }
                            } label="confirm" />
                        </div>
                    </div>
                }
                { isTopupOpen &&
                    <div className={style({ width: "90%", display: "flex"})}>
                        <input type="text" onChange={(e) => {
                            this.setState({
                                topupValue: e.target.value
                            })
                        }} />
                        <div className="">
                            <span ><img className={style({ height: "24px", marginRight:"12px" })} src={returnIcon(this.props.currency)} alt="" /></span>
                            <Button onClick={() => {
                                addNewAmount(this.props.currency, this.state.topupValue, this.props.portfolioInstance)
                                this.setState({
                                    currentAmount: this.props.portfolioInstance.getAmount(this.props.currency),
                                    isTopupOpen: false
                                })
                            }
                            } label="confirm" />
                        </div>
                    </div>
                }
            </>
        )
    }
}