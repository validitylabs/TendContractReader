const fs = require('fs');
const path = require('path');
const Web3 = require('web3');

const icoCrowdsaleContractBuild = require('./IcoCrowdsale.json');
const icoCrowdsaleContractAddress = '0x6DB05b60dD49008A76c35C8B069F3061bf47B7F4';

const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/ED3xW7lX3tZPcAunAu93'));

const crowdsaleContract = new web3.eth.Contract(
    icoCrowdsaleContractBuild.abi,
    icoCrowdsaleContractAddress,
    {
        gasPrice: 1,
        gas: 6000000
    }
);

const promiseFor = (condition, action, value) => {
    if (!condition(value)) return Promise.resolve();
    return Promise.resolve(
        action(value)
            .then(promiseFor.bind(null, condition, action))
            .catch((error) => console.log.bind(console, error))
    );
};

const error = false;
let i = 0;
const unsettledInvestments = [];

promiseFor(
    (count) => error === false,
    (count) => {
        return crowdsaleContract.methods.investments(i).call()
            .then((result) => {
                const {investor, beneficiary, weiAmount, tokenAmount, confirmed, attemptedSettlement, completedSettlement} = result;
                unsettledInvestments.push({
                    investor,
                    beneficiary,
                    amount: web3.utils.fromWei(weiAmount),
                    tokenAmount: web3.utils.fromWei(tokenAmount),
                    confirmed,
                    attemptedSettlement,
                    completedSettlement
                });
                i += 1;
            })
            .catch(() => {
                error = true;
            });
    }, 0)
    .then(() => {
        fs.writeFileSync(path.resolve(__dirname, './unsettled-investments.json'), JSON.stringify(unsettledInvestments));
    });
