export class AudioSystem {
    constructor() {
        this.sounds = {};
    }

    cargarSonido(nombre, ruta) {
        const audio = new Audio(ruta);
        this.sounds[nombre] = audio;
    }

    reproducir(nombre) {
        if (this.sounds[nombre]) {
            this.sounds[nombre].currentTime = 0;
            this.sounds[nombre].play();
        }
    }
}