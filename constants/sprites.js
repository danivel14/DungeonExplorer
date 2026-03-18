// constants/sprites.js

export const Sprites = {
    ui_inventory: require('../assets/images/inventory_sheet.png'),
    ui_settings: require('../assets/images/settings_sheet.png'),

        player_idle: require('../assets/sprites/Fighter2_Idle.png'),
        player_walk: require('../assets/sprites/Fighter2_Walk.png'),
        player_attack: require('../assets/sprites/Fighter_sword_with_shadow.png'), 
    
    // --- ENEMIGOS ---
    enemies: {
        dummy: require('../assets/sprites/Attacked_Manequin1_with_shadow.png'),
        enemy_fighter: require('../assets/sprites/Fighter2_Idle_without_shadow.png'),
        slime: require('../assets/sprites/Attacked_Manequin3_with_shadow.png'), 
    },

    // --- NPCs ---
    npcs: {
        citizen1: require('../assets/sprites/Citizen1_Idle.png'),
        citizen2: require('../assets/sprites/Citizen2_Idle.png'),
    },

    // --- ESCENARIOS (Rooms) ---
    world: {
        exterior: require('../assets/images/Exterior.png'),
        pasillo: require('../assets/images/Walls_street.png'),
        crack: require('../assets/images/Decorative_cracks.png'),
    },
    
    items: {
        pocion: require('../assets/sprites/Potion_Green.png'), //individual
        pocion2: require('../assets/sprites/Potion_Pink.png'), //
    },

};