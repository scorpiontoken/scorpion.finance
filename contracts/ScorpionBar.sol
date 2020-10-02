pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";


contract ScorpionBar is ERC20("ScorpionBar", "xSCORP"){
    using SafeMath for uint256;
    IERC20 public scorpion;

    constructor(IERC20 _scorpion) public {
        scorpion = _scorpion;
    }

    // Enter the bar. Pay some SCORPs. Earn some shares.
    function enter(uint256 _amount) public {
        uint256 totalScorpion = scorpion.balanceOf(address(this));
        uint256 totalShares = totalSupply();
        if (totalShares == 0 || totalScorpion == 0) {
            _mint(msg.sender, _amount);
        } else {
            uint256 what = _amount.mul(totalShares).div(totalScorpion);
            _mint(msg.sender, what);
        }
        scorpion.transferFrom(msg.sender, address(this), _amount);
    }

    // Leave the bar. Claim back your SCORPs.
    function leave(uint256 _share) public {
        uint256 totalShares = totalSupply();
        uint256 what = _share.mul(scorpion.balanceOf(address(this))).div(totalShares);
        _burn(msg.sender, _share);
        scorpion.transfer(msg.sender, what);
    }
}