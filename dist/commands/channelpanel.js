import { __decorate, __metadata, __param } from "tslib";
import { Channel, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { Discord, Slash, SlashOption } from 'discordx';
let ChannnelPanel = class ChannnelPanel {
    async execute(channel, interaction) {
        var c = interaction.guild.channels.cache.get(channel.id);
        if (c.isText()) {
            c.send({
                embeds: [new MessageEmbed().setColor('GREY').setTitle('support').setDescription('Votre demande de support')],
                components: [new MessageActionRow().addComponents(new MessageButton().setCustomId('panel').setLabel('Support').setStyle('PRIMARY'))]
            });
        }
        interaction.reply('panel crée!');
        return true;
    }
};
__decorate([
    Slash('channelpanel'),
    __param(0, SlashOption('channel', { type: 'CHANNEL', description: 'channel', required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Channel, CommandInteraction]),
    __metadata("design:returntype", Promise)
], ChannnelPanel.prototype, "execute", null);
ChannnelPanel = __decorate([
    Discord()
], ChannnelPanel);
;
export default ChannnelPanel;
//# sourceMappingURL=channelpanel.js.map