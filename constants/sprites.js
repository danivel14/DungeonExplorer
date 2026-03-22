export const Sprites = {

    // --- JUGADOR ---
    player: {
        idle: require('../assets/sprites/Fighter2Left_Idle.png'),
        walk: require('../assets/sprites/Fighter2Left_Walk.png'),
        attack: require('../assets/sprites/Fighter_sword_with_shadow.png'),
    },

    // --- ENEMIGOS ---
    enemies: {
        dummy: require('../assets/sprites/Attacked_Manequin1_with_shadow.png'),
        enemy_fighter: require('../assets/sprites/Fighter_sword_without_shadow.png'),
        slime: require('../assets/sprites/Attacked_Manequin3_with_shadow.png'), 
    },

    // --- NPCs ---
    npcs: {
        citizen1: require('../assets/sprites/Citizen1_Idle.png'),
        citizen2: require('../assets/sprites/Citizen2_Idle.png'),
    },

    // --- ESCENARIOS (Rooms) ---
    world: {
        interior: require('../assets/images/Interior.png'),
        tileset: require('../assets/images/tileset.png'),
        catacumbas: require('../assets/images/catacumbas.png')
    },
    
    items: {
        pocion: require('../assets/sprites/Potion_Green.png'), 
        pocion2: require('../assets/sprites/Potion_Pink.png'), 
    },

    // --- OTROS ---
    shadow: require('../assets/sprites/Different_characters_shadow.png'),
};
