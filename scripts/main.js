import * as mc from "@minecraft/server";

const world = mc.world;
const system = mc.system;

// This runs every tick
system.runInterval(() => {
    // Get all players in the world
    /** @type {mc.Player[]} **/ const players = mc.world.getPlayers();

    // Loop through all players
    for (const player of players) {
        // Now do what you want with the player
        
    }
});