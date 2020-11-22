export class PortfolioState {
    private BTC:number = 3
    private ETH: number = 221
    private USD: number = 40312
    private total: number = 0
    private btcPrice: number = 0
    private ethPrice: number = 0
    constructor(){
        this.setBtcPrice()
        this.setEthPrice()
    }
    addBtcAmmount(btcAmount: number) {
        this.BTC += btcAmount
    }
    minusBtcAmmount(btcAmount: number){
        this.BTC -= btcAmount
    }
    addEthAmount(ethAmount: number) {
        this.ETH += ethAmount
    }
    minusEthAmount(ethAmount: number){
        this.ETH -= ethAmount
    }
    addUsdAmount(usdAmount: number) {
        this.USD += usdAmount
    }
    minusUsdAmount(usdAmount: number){
        this.USD -= usdAmount
    }
    setTotalAmount(btcPrice: number, ethPrice: number) {
        this.total = (this.BTC * btcPrice) + (this.ETH * ethPrice) + this.USD
    }
    async setBtcPrice(){
        const resp = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd").then(response => response.json())
        const bitcoinPrice = resp.bitcoin.usd;
        this.btcPrice = bitcoinPrice
    }
    async setEthPrice(){
        const resp = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd").then(response => response.json())
        const ethereumPrice = resp.ethereum.usd
        this.ethPrice = ethereumPrice

    }
    getAmount(currency: string) {
        if(currency === "BTC") return this.BTC
        if(currency === "ETH") return this.ETH
        if(currency === "USD") return this.USD
        return 1
    }
    getCurrencyInUsd(currency: any) {
        if(currency === "BTC") return (this.BTC*this.btcPrice)
        if(currency === "ETH") return (this.ETH*this.ethPrice)
        if(currency === "USD") return this.USD
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