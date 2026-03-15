export class ItemDatabase {
    constructor() {
        this.items = {}; // Nuestra tabla hash simple
    }

    // Insertar objeto en la tabla
    agregarItem(id, nombre, tipo, valor) {
        this.items[id] = { nombre, tipo, valor };
    }

    // Buscar objeto por ID (O(1) - Acceso instantáneo)
    obtenerItem(id) {
        return this.items[id] || null;
    }
}

// Ejemplo de uso inicial (puedes poner esto en main.js):
const db = new ItemDatabase();
db.agregarItem("p01", "Poción de Vida", "Consumible", 20);
db.agregarItem("k01", "Llave de Bronce", "Misión", 0);
db.agregarItem("w01", "Espada Oxidada", "Arma", 5);