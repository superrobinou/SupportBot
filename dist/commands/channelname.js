import { __decorate, __metadata, __param } from "tslib";
import { CommandInteraction } from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';
import { DB } from '../Main.js';
let ChannnelName = class ChannnelName {
    async execute(nom, interaction) {
        console.log(DB);
        DB.put('name', nom);
        interaction.reply('nom du channel changé');
        return true;
    }
};
__decorate([
    Slash('channelname'),
    __param(0, SlashOption('nom', { type: 'STRING', description: 'nom', required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CommandInteraction]),
    __metadata("design:returntype", Promise)
], ChannnelName.prototype, "execute", null);
ChannnelName = __decorate([
    Discord()
], ChannnelName);
;
export default ChannnelName;
//# sourceMappingURL=channelname.js.map