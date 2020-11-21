export class PortfolioState {
    private BTC:number = 12
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
        // this.btcPrice = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd").then(response => response.json())
        const resp = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
        const { BTC } = await resp.json();
        this.btcPrice = BTC
    }
    async setEthPrice(){
        const resp = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
        const { ETH } = await resp.json()
        this.ethPrice = ETH

    }
    getAmount(currency: any) {
        if(currency === "BTC") return this.BTC
        if(currency === "ETH") return this.ETH
        if(currency === "USD") return this.USD
    }
    getEthAmount() {
        return this.ETH
    }
    getUsdAmount() {
        return this.USD
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