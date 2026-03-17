// constants/sprites.js

export const GameAssets = {
    // --- JUGADOR ---
    player: {
        idle: require('../assets/sprites/Fighter2Left_Idle.png'),
        walk: require('../assets/sprites/Fighter2Left_Walk.png'),
        attack: require('../assets/sprites/Fighter_sword_with_shadow.png'),
    },

    // --- ENEMIGOS ---
    enemies: {
        dummy: require('../assets/sprites/Attacked_Manequin1_with_shadow.png'),
        fighter: require('../assets/sprites/Fighter2_Idle_without_shadow.png'),
        slime: require('../assets/sprites/Attacked_Manequin3_with_shadow.png'), 
    },

    // --- NPCs ---
    npcs: {
        citizen1: require('../assets/sprites/Citizen1_Idle.png'),
        citizen2: require('../assets/sprites/Citizen2_Idle.png'),
    },

    // --- ESCENARIOS (Rooms) ---
    world: {
        exterior: require('../assets/images/DungeonTileset.png'),
        pasillo: require('../assets/images/Walls_street.png'),
    },

    // --- OTROS ---
    shadow: require('../assets/sprites/Different_characters_shadow.png'),
};

export const Sprites = GameAssets;