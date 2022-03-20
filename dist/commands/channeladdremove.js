import { __decorate, __metadata, __param } from "tslib";
import { CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx';
import errors from 'level-errors';
import { DB } from '../Main.js';
let ChannnelAddRemove = class ChannnelAddRemove {
    async execute(state, number, interaction) {
        var name = 'support';
        var lastchannel = 0;
        try {
            name = await DB.get('name');
        }
        catch (err) {
            if (err instanceof errors.NotFoundError) {
            }
            else {
                console.log(err);
            }
        }
        try {
            lastchannel = await DB.get('LastChannel');
        }
        catch (err) {
            if (err instanceof errors.NotFoundError) {
            }
            else {
                console.log(err);
            }
        }
        var newLastchannel = 0;
        console.log(state);
        if (state == "add") {
            newLastchannel = lastchannel + number;
            for (var i = lastchannel; i <= lastchannel + number; i++) {
                await interaction.guild.channels.create(name + i, { type: 'GUILD_TEXT', reason: 'support needed' });
                DB.put('channel' + i, 'true');
            }
            DB.put('LastChannel', newLastchannel);
        }
        else {
            newLastchannel = lastchannel - number;
            if (newLastchannel > 0) {
                for (var i = lastchannel; i <= lastchannel + number; i--) {
                    const channel = interaction.guild.channels.cache.find(r => r.name === name + i);
                    channel.delete();
                    DB.del('channel' + i);
                }
                DB.put('LastChannel', newLastchannel);
            }
        }
        interaction.reply('channel crée/supprimé!');
        return true;
    }
};
__decorate([
    Slash('cm'),
    __param(0, SlashChoice("add", "add")),
    __param(0, SlashChoice("remove", "remove")),
    __param(0, SlashOption("state")),
    __param(1, SlashOption("number", { type: "INTEGER", description: "number", minValue: 1, required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, CommandInteraction]),
    __metadata("design:returntype", Promise)
], ChannnelAddRemove.prototype, "execute", null);
ChannnelAddRemove = __decorate([
    Discord()
], ChannnelAddRemove);
export default ChannnelAddRemove;
//# sourceMappingURL=channeladdremove.js.map