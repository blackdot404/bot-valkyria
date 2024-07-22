module.exports = {
    name: 'messageReactionAdd',
    async execute(messageReaction, user) {
        if (user.bot) return;
        // console.log(messageReaction._emoji.name, messageReaction._emoji.id);
    },
};
