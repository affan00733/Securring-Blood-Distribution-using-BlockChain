import React, { Component, useEffect, useState } from "react";
import Web3 from "web3";
import freelance from "../src/build/contracts/AssetTracker.json"

import BlockchainContext from "./context/BlockChainContext";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
// pages for this kit

import LoginPage from "views/LoginPage.js";
import Timeline from "views/Timeline.js";
import LandingPage from "views/LandingPage.js";
import BloodbankHome from "views/BloodbankHome.js";
import BloodIntake from "views/BloodIntakePage.js";
import EditDetails from "views/EditDetails.js";
import HospitalHome from "views/HospitalHome.js";
import Temp from "views/temp";
import GlobalState from "./context/GlobalState"


const getWeb3 = async () => {
    let tempWeb3 = undefined;
    if (window.ethereum) {
        tempWeb3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
            // console.log(tempWeb3);
            //console.log(web3.eth.getAccounts());
            // Acccounts now exposed
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (tempWeb3) {
        tempWeb3 = new Web3(tempWeb3.currentProvider);
        // console.log(tempWeb3);
        // Acccounts always exposed
    }
    // Non-dapp browsers...
    else {
        console.log(
            "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
    }

    return tempWeb3;
};

const App = () => {
    const [web3, setWeb3] = useState(undefined);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState();

    useEffect(() => {
        const init = async () => {
            // load web3
            const tempWeb3 = await getWeb3();
            // loadBlockchainData
            const tempAccounts = await tempWeb3.eth.getAccounts();
            const networkId = await tempWeb3.eth.net.getId();
            let freelancecon;

            const listener = (accs) => {
                setAccounts(accs);
            };

            window.ethereum.on("accountsChanged", listener);


            // console.log(tempWeb3);
            // console.log(tempAccounts);
            // //
            // console.log(networkId);
            // console.log(freelance);

            const networkdata = freelance.networks[networkId];
            // console.log("networkdata",networkdata);
            if (networkdata) {
                const abi = freelance.abi;
                // console.log("freelance.abi", freelance.abi);
                freelancecon = new tempWeb3.eth.Contract(
                    abi,
                    networkdata.address
                );

                // console.log("freelancecon",freelancecon);
            }

            // saving this to states
            setWeb3(tempWeb3);
            setAccounts(tempAccounts);
            setContract(freelancecon);
            // console.log("contract init", contract);
            // console.log("accounts", accounts);
            // console.log("web3", web3);
        };

        init();
    }, []);


    return (
        <GlobalState >
            <BlockchainContext.Provider value={{ web3, accounts, contract }}>
            <Switch>
                <Switch>
                    <Route path="/login" render={(props) => <LoginPage {...props} />} />
                    <Route path="/timeline" render={(props) => <Timeline {...props} />} />
                    <Route path="/bloodintake" render={(props) => <BloodIntake {...props} />} />
                    <Route path="/editdetails" render={(props) => <EditDetails {...props} />} />
                    <Route path="/hospitalhome" render={(props) => <HospitalHome {...props} />} />
                    <Route path="/temp" render={(props) => <Temp {...props} />} />
                    <Route
                        path="/bloodbankhome"
                        render={(props) => <BloodbankHome {...props} />}
                    />
                    <Route path="/" render={(props) => <LandingPage {...props} />} />
                    <Redirect to="/" />
                </Switch>
            </Switch>
            </BlockchainContext.Provider>
        </GlobalState>
    );
}

export default App;
