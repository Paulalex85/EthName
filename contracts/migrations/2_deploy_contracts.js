const EthName = artifacts.require("EthName");

module.exports = function (deployer) {
    deployer.deploy(EthName);
};
