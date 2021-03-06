const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 10,
			guarded: true,
			description: 'Enable a piece',
			usage: '<Piece:piece>'
		});
	}

	async run(message, [piece]) {
		piece.enable();
		if (this.client.shard) {
			await this.client.shard.broadcastEval(`
				if (this.shard.id !== ${this.client.shard.id}) this.${piece.store}.get('${piece.name}').enable();
			`);
		}
		return message.sendCode('diff', message.language.get('COMMAND_ENABLE', piece.type, piece.name));
	}

};
