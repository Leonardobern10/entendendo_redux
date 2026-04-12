import * as SQLite from "expo-sqlite";

// Conectar ao banco de dados
// Retornar a instancia do banco de dados
// Para que os métodos executem as queries

export const database = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("proj2.db");
    if (!db) throw new Error("DB não criado corretamente!");
    console.log("DB criado com sucesso!");
    return db;
  } catch (error) {
    console.error("Erro ao criar DB: ", error);
  } finally {
    console.log("Processo de inicialização do DB executado!");
  }
};
