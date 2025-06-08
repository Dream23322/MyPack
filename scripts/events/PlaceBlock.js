import * as mc from "@minecraft/server";
import { IBlock } from "../api/classes/IBlock";

mc.world.afterEvents.playerPlaceBlock.subscribe((eventData) => {
    const player = eventData.player;
    const block = eventData.block
    const iblock = new IBlock(block.location.x, block.location.y, block.location.z, block.dimension.id);

    
});