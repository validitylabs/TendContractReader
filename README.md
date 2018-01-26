# Tend contract reader

## Requirements
NodeJS 8 is required.
We recommend to install the correct NodeJS version.
If you have already installed NodeJS 8 you are not obligated to install nvm.

### NVM
Go to [NVM](https://github.com/creationix/nvm) and follow the installation description.

## Setup
Install the correct NodeJS version:
```
nvm install
nvm use
```
Run the following commands to install the dependencies:
```
npm install -g yarn
yarn
```

## Generate json file with unsettled investments
```
yarn run get-unsettled-investments
```

The script creates a file `unsettled-investments.json` which is located in the main directory of the repository and contains all unsettled investments.
