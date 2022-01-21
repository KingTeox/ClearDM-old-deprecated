const Discord = require("discord.js-selfbot");
const Client = new Discord.Client();
const config = require("./src/json/config.json")

Client.on("ready", async () => {
    
    console.log(`[Teox] <Client> Ready in ${Client.user.tag}`);

    /**
     * 
     * @param {String} id 
     * @param {String} idDM 
     */
    async function Clear(idDM) {
        
        console.log(`[Teox] <ClearFunction> Started.`);

        let ClearMembro = Client.users.cache.get(idDM);
        let DM = await ClearMembro.send("[CLEAR]");
        let Messages = await DM.channel.messages.fetch();
        let Filtro = Messages.filter(m => m.author.id === Client.user.id);
        
        console.log(`[Teox] <ClearFunction> Messages ${Filtro.size} deleting.`);

        function Delete() {
            let deleteMSG = Filtro.random();
            deleteMSG.delete().then(Deleted => {
                Filtro.delete(Filtro.id);
                console.log(`[Teox] <ClearFunction> Message deleted [${Deleted.content}]`);
            }).catch(Err => { return; });
        }; 
        setInterval(() => { 
            if (Filtro.size === 0) {
                console.log(`[Teox] <ClearFunction> Messages deleted Exiting..`);
                process.exit(1);
            } else {
                Delete(); 
            }
        }, 2000);
        

    }; Clear(config.IdClear);
});

Client.login(config.Token).catch(err => {
    console.log(`Token Error`)
});