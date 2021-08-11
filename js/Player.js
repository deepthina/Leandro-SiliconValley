class Player {
    constructor() {
        this.index = null;
        this.name = null;
        this.pos = null;


    }
    getPlayers() {
        var plrRef = database.ref('playerCount');
        plrRef.on("value", function (data) { plrCount = data.val() })

    }

    updatePlayer(Pcount) {
        database.ref('/').update({ playerCount: Pcount })
    }


    static getPlrInfo() {
        var plrInfoRef = database.ref('players')
        plrInfoRef.on("value", function (data) { allPlayers = data.val() })
    }

        updateName() {
            var playerIndex = "players/player" + this.index;
            database.ref(playerIndex).set({name: this.name})
        }



}