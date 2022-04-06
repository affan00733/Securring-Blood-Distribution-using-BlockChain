const AssetTracker = artifacts.require("AssetTracker");

module.exports = function (deployer) {
  deployer.deploy(AssetTracker);
};
