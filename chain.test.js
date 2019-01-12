const Block = require('./block');
const Chain = require('./chain');

describe('Chain', () =>
{
	let chain;

	beforeEach(() =>
	{
		chain = new Chain();
	});

	it('starts with the genesis block', () =>
	{
		expect(chain.blocks[0].data).toEqual(Block.genesis().data);
	});

	it('adds a new block to the end of the chain', () =>
	{
		const data = 'Test block';

		chain.add(data);

		expect(chain.blocks[1].data).toEqual(data);
	});

	it('check validity of a valid chain', () =>
	{
		chain.add('Test block');

		expect(chain.valid()).toBe(true);
	});

	it('check validity of an invalid data block', () =>
	{
		chain.blocks[0].data = 'Bad data';

		expect(chain.valid()).toBe(false);
	});

	it('check validity of an invalid prevHash', () =>
	{
		chain.add('Test block');

		chain.blocks[1].prevHash = 'Bad hash';

		expect(chain.valid()).toBe(false);
	});

	it('check validity of an invalid hash', () =>
	{
		chain.add('Test block');

		chain.blocks[0].hash = 'Bad hash';

		expect(chain.valid()).toBe(false);
	});
});
