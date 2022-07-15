const ContenedorMongoDB = require("../../contenedores/contenedorMongoDB");
class ChatsDAOMongoDB extends ContenedorMongoDB {
  constructor() {
    super("chats", {
      author: [
        {
          id: { type: String, required: true },
          nombre: { type: String, required: true },
          apellido: { type: String, required: true },
          edad: { type: Number, required: true },
          alias: { type: String, required: true },
          avatar: { type: String, required: true },
        },
      ],
      text: { type: String, required: true },
    });
  }
}

module.exports = ChatsDAOMongoDB;
