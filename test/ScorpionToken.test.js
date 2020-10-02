const { expectRevert } = require('@openzeppelin/test-helpers');
const ScorpionToken = artifacts.require('ScorpionToken');

contract('ScorpionToken', ([alice, bob, carol]) => {
    beforeEach(async () => {
        this.scorpion = await ScorpionToken.new({ from: alice });
    });

    it('should have correct name and symbol and decimal', async () => {
        const name = await this.scorpion.name();
        const symbol = await this.scorpion.symbol();
        const decimals = await this.scorpion.decimals();
        assert.equal(name.valueOf(), 'ScorpionToken');
        assert.equal(symbol.valueOf(), 'SCORP');
        assert.equal(decimals.valueOf(), '18');
    });

    it('should only allow owner to mint token', async () => {
        await this.scorpion.mint(alice, '100', { from: alice });
        await this.scorpion.mint(bob, '1000', { from: alice });
        await expectRevert(
            this.scorpion.mint(carol, '1000', { from: bob }),
            'Ownable: caller is not the owner',
        );
        const totalSupply = await this.scorpion.totalSupply();
        const aliceBal = await this.scorpion.balanceOf(alice);
        const bobBal = await this.scorpion.balanceOf(bob);
        const carolBal = await this.scorpion.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '100');
        assert.equal(bobBal.valueOf(), '1000');
        assert.equal(carolBal.valueOf(), '0');
    });

    it('should supply token transfers properly', async () => {
        await this.scorpion.mint(alice, '100', { from: alice });
        await this.scorpion.mint(bob, '1000', { from: alice });
        await this.scorpion.transfer(carol, '10', { from: alice });
        await this.scorpion.transfer(carol, '100', { from: bob });
        const totalSupply = await this.scorpion.totalSupply();
        const aliceBal = await this.scorpion.balanceOf(alice);
        const bobBal = await this.scorpion.balanceOf(bob);
        const carolBal = await this.scorpion.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '90');
        assert.equal(bobBal.valueOf(), '900');
        assert.equal(carolBal.valueOf(), '110');
    });

    it('should fail if you try to do bad transfers', async () => {
        await this.scorpion.mint(alice, '100', { from: alice });
        await expectRevert(
            this.scorpion.transfer(carol, '110', { from: alice }),
            'ERC20: transfer amount exceeds balance',
        );
        await expectRevert(
            this.scorpion.transfer(carol, '1', { from: bob }),
            'ERC20: transfer amount exceeds balance',
        );
    });
  });
