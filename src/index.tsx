// import React from 'react';
import * as React from 'react'
import { render } from 'react-dom'
import "bootstrap/dist/css/bootstrap.css";
import { PortfolioPage } from "./CryptoPortfolioPage/index"
import { ExchangePage } from "./ExchangePage/index"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



const portfolio = {
    BTC: 1234.78,
    ETH: 3128.50,
    USD: 9405
}
class App extends React.Component {
    render() {
        return (
            <>
                <Tabs>
                    <TabList>
                        <Tab>Portfolio</Tab>
                        <Tab>Exchange</Tab>
                    </TabList>
                    <TabPanel>
                        <PortfolioPage />
                    </TabPanel>
                    <TabPanel>
                        <ExchangePage />
                    </TabPanel>
                </Tabs>
            </>
        )
    }
}


render(<App />, document.getElementById("root"))