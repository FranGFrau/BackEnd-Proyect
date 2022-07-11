import db from "./FBconfig";
import { getDocs, collection, query, where } from "firebase/firestore";

class ContenedorFirebase {
  constructor(name) {
    this.name = name;
  }
  async create(data) {
    const Collection = collection(db, this.name);
    const documentos = getDocs(Collection);
    const newData = await documentos.add(data);
    return newData.id;
  }
  async update(id, data) {
    const Collection = collection(db, this.name);
    const filtro = query(Collection, where("id", "==", id));
    const documentos = getDocs(filtro);
    const newData = await documentos.update(data);
    return newData;
  }
  async delete(id) {
    const Collection = collection(db, this.name);
    const filtro = query(Collection, where("id", "==", id));
    const documentos = getDocs(filtro);
    const newData = await documentos.delete();
    return newData;
  }
  async get(id) {
    const Collection = collection(db, this.name);
    const filtro = query(Collection, where("id", "==", id));
    const documentos = getDocs(filtro);
    const newData = await documentos.get();
    return newData;
  }
  async getAll() {
    const Collection = collection(db, this.name);
    const documentos = getDocs(Collection);
    const newData = await documentos.get();
    return newData;
  }
}

module.exports = ContenedorFirebase;
