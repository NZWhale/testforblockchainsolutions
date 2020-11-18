
import React from 'react';


export const CurrencyBlock = (portfolio) => {
    return (
        <div>
            <BtcBlock portfolio={portfolio} />
            <EthBlock portfolio={portfolio} />
            <UsdBlock portfolio={portfolio} />
        </div>
    )
}


class BtcBlock extends React.Component {
    render() {
        const props = this.props
        const portfolio = props.portfolio.portfolio
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend" id="button-addon3">
                    <button className="btn btn-outline-secondary" type="button">Top UP</button>
                    <div className="card">
                        <div className="card-header">BTC</div>
                        <div className="card-body">{portfolio.BTC}</div>
                    </div>
                    <button className="btn btn-outline-secondary" type="button">Withdraw</button>
                </div>
            </div>
        )
    }
}

class EthBlock extends React.Component {
    render() {
        const props = this.props
        const portfolio = props.portfolio.portfolio

        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend" id="button-addon3">
                    <button className="btn btn-outline-secondary" type="button">Top UP</button>
                    <div className="card">
                        <div className="card-header">ETH</div>
                        <div className="card-body">{portfolio.ETH}</div>
                    </div>
                    <button className="btn btn-outline-secondary" type="button">Withdraw</button>
                </div>
            </div>
        )
    }
}

class UsdBlock extends React.Component {
    render() {
        const props = this.props
        const portfolio = props.portfolio.portfolio
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend" id="button-addon3">
                    <button className="btn btn-outline-secondary" type="button">Top UP</button>
                    <div className="card">
                        <div className="card-header">USD</div>
                        <div className="card-body">{portfolio.USD}</div>
                    </div>
                    <button className="btn btn-outline-secondary" type="button">Withdraw</button>
                </div>
            </div>
        )
    }
}