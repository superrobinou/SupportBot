import { __decorate, __metadata } from "tslib";
import { ButtonInteraction } from "discord.js";
import { ButtonComponent, Discord } from "discordx";
import { DB } from "../Main.js";
let OnSupportOpen = class OnSupportOpen {
    Button(interaction) {
        console.log(interaction);
        interaction.reply(`👋 ${interaction.member}`);
    }
    async checkOpenChannel() {
        var lastchannel = await DB.get('LastChannel');
        var openChannels = [];
        for (var i = 1; i++; i <= lastchannel) {
            var channel = await DB.get('channel' + i);
            if (channel === 'true') {
                openChannels.push(i);
            }
        }
        return openChannels;
    }
};
__decorate([
    ButtonComponent('panel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ButtonInteraction]),
    __metadata("design:returntype", void 0)
], OnSupportOpen.prototype, "Button", null);
OnSupportOpen = __decorate([
    Discord()
], OnSupportOpen);
export default OnSupportOpen;
//# sourceMappingURL=onsupportopen.js.map