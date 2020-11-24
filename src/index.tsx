// import React from 'react';
import * as React from 'react'
import { render } from 'react-dom'
import "bootstrap/dist/css/bootstrap.css";
import { PortfolioPage } from "./CryptoPortfolioPage/index"
import { ExchangePage } from "./ExchangePage/index"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class App extends React.Component {
    render() {
        return (
            <>
                <Tabs>
                    <TabList>
                        <Tab>Portfolio</Tab>
                        <Tab>Exchange</Tab>
                        <Tab><a href="https://github.com/NZWhale/testforblockchainsolutions">GitHub</a></Tab>
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