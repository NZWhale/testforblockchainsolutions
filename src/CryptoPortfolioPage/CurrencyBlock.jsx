import React, { useState } from 'react';

export class CurrencyBlock extends React.Component {

    render() {
        const portfolio = this.props.portfolio
        return (
            <div style={{position: "center"}}>
                <BtcBlock portfolio={portfolio} />
                <EthBlock portfolio={portfolio} />
                <UsdBlock portfolio={portfolio} />
            </div>
        )
    }

}



const BtcBlock = (portfolioProps) => {
    const [isTopupOpen, setTopupState] = useState(false)
    const [isWithdrawOpen, setWithdrawState] = useState(false)
    const props = portfolioProps
    const portfolio = props.portfolio
    const btcIconUrl = "https://i-invdn-com.akamaized.net/ico_flags/80x80/v32/bitcoin.png"

    
    const sumCurrency = (portfolio) => {
        const topupAmmount = document.getElementById("btcInput").value
        portfolio.BTC += +topupAmmount
        setTopupState(false)
    }
    const subtractionCurrency = (portfolio) => {
        const topupAmmount = document.getElementById("btcInput").value
        portfolio.BTC -= +topupAmmount
        setWithdrawState(false)
    }
    return (
        <div className="input-group mb-3" style={{ "zIndex": "0" }}>
            <div className="input-group-prepend" id="button-addon3">
                <button className="btn btn-outline-secondary" type="button" onClick={() => isWithdrawOpen ? setWithdrawState(false) : setTopupState(!isTopupOpen)}>Top UP</button>
                <div className="card">
                    <div className="card-header">BTC</div>
                    <div className="card-body">{portfolio.BTC}</div>
                </div>
                <button className="btn btn-outline-secondary" type="button" onClick={() => isTopupOpen ? setTopupState(false) : setWithdrawState(!isWithdrawOpen)}>Withdraw</button>
            </div>

            {isWithdrawOpen &&
                <div className="input-group" style={{ width: "90%" }}>
                    <input type="text" id="btcInput" className="form-control" />
                    <div className="input-group-append">
                        <span className="input-group-text"><img style={{ height: "24px" }} src={btcIconUrl} alt="" /></span>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => subtractionCurrency(portfolio)}>Done</button>
                    </div>
                </div>
            }
            { isTopupOpen &&
                <div className="input-group" style={{ width: "90%" }}>
                    <input type="text" id="btcInput" className="form-control" />
                    <div className="input-group-append">
                        <span className="input-group-text"><img style={{ height: "24px" }} src={btcIconUrl} alt="" /></span>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => sumCurrency(portfolio)}>Confirm</button>
                    </div>
                </div>
            }
        </div>
    )
}

const EthBlock = (portfolioProps) => {
    const [isTopupOpen, setTopupState] = useState(false)
    const [isWithdrawOpen, setWithdrawState] = useState(false)
    const props = portfolioProps
    const portfolio = props.portfolio
    const ethIconUrl = "https://i-invdn-com.akamaized.net/ico_flags/80x80/v32/ethereum.png"

    const sumCurrency = (portfolio) => {
        const topupAmmount = document.getElementById("ethInput").value
        portfolio.ETH += +topupAmmount
        setTopupState(false)
    }
    const subtractionCurrency = (portfolio) => {
        const topupAmmount = document.getElementById("ethInput").value
        portfolio.ETH -= +topupAmmount
        setWithdrawState(false)
    }

    return (
        <div className="input-group mb-3" style={{ "zIndex": "0" }}>
            <div className="input-group-prepend" id="button-addon3">
                <button className="btn btn-outline-secondary" type="button" onClick={() => isWithdrawOpen ? setWithdrawState(false) : setTopupState(!isTopupOpen)}>Top UP</button>
                <div className="card">
                    <div className="card-header">ETH</div>
                    <div className="card-body">{portfolio.ETH}</div>
                </div>
                <button className="btn btn-outline-secondary" type="button" onClick={() => isTopupOpen ? setTopupState(false) : setWithdrawState(!isWithdrawOpen)}>Withdraw</button>
            </div>
            {isWithdrawOpen &&
                <div className="input-group" style={{ width: "90%" }}>
                    <input type="text" id="ethInput" className="form-control" />
                    <div className="input-group-append">
                        <span className="input-group-text"><img style={{ height: "24px" }} src={ethIconUrl} alt="" /></span>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => subtractionCurrency(portfolio)}>Done</button>
                    </div>
                </div>
            }
            { isTopupOpen &&
                <div className="input-group" style={{ width: "90%" }}>
                    <input type="text" id="ethInput" className="form-control" />
                    <div className="input-group-append">
                        <span className="input-group-text"><img style={{ height: "24px" }} src={ethIconUrl} alt="" /></span>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => sumCurrency(portfolio)}>Confirm</button>
                    </div>
                </div>
            }
        </div>
    )
}


const UsdBlock = (portfolioProps) => {
    const [isTopupOpen, setTopupState] = useState(false)
    const [isWithdrawOpen, setWithdrawState] = useState(false)
    const props = portfolioProps
    const portfolio = props.portfolio
    const dollarIconUrl = "https://www.flaticon.com/svg/static/icons/svg/262/262280.svg"

    const sumCurrency = (portfolio) => {
        const topupAmmount = document.getElementById("dollarInput").value
        portfolio.USD += +topupAmmount
        setTopupState(false)
    }
    const subtractionCurrency = (portfolio) => {
        const topupAmmount = document.getElementById("dollarInput").value
        portfolio.USD -= +topupAmmount
        setWithdrawState(false)
    }

    return (
        <div className="input-group mb-3" style={{ "zIndex": "0" }}>
            <div className="input-group-prepend" id="button-addon3">
                <button className="btn btn-outline-secondary" type="button" onClick={() => isWithdrawOpen ? setWithdrawState(false) : setTopupState(!isTopupOpen)}>Top UP</button>
                <div className="card">
                    <div className="card-header">USD</div>
                    <div className="card-body">{portfolio.USD}</div>
                </div>
                <button className="btn btn-outline-secondary" type="button" onClick={() => isTopupOpen ? setTopupState(false) : setWithdrawState(!isWithdrawOpen)}>Withdraw</button>
            </div>
            {isWithdrawOpen &&
                <div className="input-group" style={{ width: "90%" }}>
                    <input type="text" id="dollarInput" className="form-control" />
                    <div className="input-group-append">
                        <span className="input-group-text"><img style={{ height: "24px" }} src={dollarIconUrl} alt="" /></span>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => subtractionCurrency(portfolio)}>Done</button>
                    </div>
                </div>
            }
            { isTopupOpen &&
                <div className="input-group" style={{ width: "90%" }}>
                    <input type="text" id="dollarInput" className="form-control" />
                    <div className="input-group-append">
                        <span className="input-group-text"><img style={{ height: "24px" }} src={dollarIconUrl} alt="" /></span>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => sumCurrency(portfolio)}>Confirm</button>
                    </div>
                </div>
            }
        </div>
    )
}
