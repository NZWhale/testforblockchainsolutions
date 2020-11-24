export class PortfolioState {
    private BTC: number = 2
    private ETH: number = 200
    private USD: number = 40312
    private total: number = 0
    private btcPrice: number = 0
    private ethPrice: number = 0
    constructor() {
        this.setBtcPrice()
        .then(() => this.setEthPrice())
        .then(() => this.setTotalAmount())
    }
    addBtcAmount(btcAmount: number) {
        this.BTC += btcAmount
        console.log(this.BTC)
    }
    minusBtcAmount(btcAmount: number) {
        if (this.BTC - btcAmount < 0) {
            alert("not enough currency")
            return null
        } else {
            this.BTC -= btcAmount
            console.log(this.BTC)
        }
    }
    addEthAmount(ethAmount: number) {
        this.ETH += ethAmount
        console.log(this.ETH)
    }
    minusEthAmount(ethAmount: number) {
        if (this.ETH - ethAmount < 0) {
            alert("not enough currency")
            return null
        } else {
            this.ETH -= ethAmount
            console.log(this.ETH)
        }
    }
    addUsdAmount(usdAmount: number) {
        this.USD += usdAmount
        console.log(this.USD)
    }
    minusUsdAmount(usdAmount: number) {
        if (this.USD - usdAmount < 0) {
            alert("not enough currency")
            return null
        } else {
            this.USD -= usdAmount
            console.log(this.USD)
        }
    }
    setTotalAmount() {
        this.total = (this.BTC * this.btcPrice) + (this.ETH * this.ethPrice) + this.USD
    }
    async setBtcPrice() {
        const resp = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd").then(response => response.json())
        const bitcoinPrice = resp.bitcoin.usd;
        this.btcPrice = bitcoinPrice
    }
    async setEthPrice() {
        const resp = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd").then(response => response.json())
        const ethereumPrice = resp.ethereum.usd
        this.ethPrice = ethereumPrice

    }
    getAmount(currency: string) {
        if (currency === "BTC") return this.BTC
        if (currency === "ETH") return this.ETH
        if (currency === "USD") return this.USD
        return 1
    }
    getCurrencyInUsd(currency: any) {
        if (currency === "BTC") return (this.BTC * this.btcPrice)
        if (currency === "ETH") return (this.ETH * this.ethPrice)
        if (currency === "USD") return this.USD
    }
    getTotalAmount() {
        return this.total
    }
    getBtcPrice() {
        return this.btcPrice
    }
    getEthPrice() {
        return this.ethPrice
    }
}

let instance: PortfolioState;
export default function getInstance(): PortfolioState {
    if (!instance) {
        instance = new PortfolioState()
    }
    return instance;
}