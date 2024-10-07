import mongoose from "mongoose";
import db from "../../src/config/dbConnect.js";

jest.mock("mongoose", () => ({
  connect: jest.fn(),
  connection: {
    on: jest.fn(),
    once: jest.fn(),
  },
}));

describe("Testar a conexão com o banco de dados", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve chamar o console.Error quando houver um erro de conexão", ()=>{
    const error = new Error("Erro de conexão");
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    
    mongoose.connection.on.mockImplementationOnce((event, callback) => {
      if (event === "error") {
        callback(error);
      }
    });
    
    db();
    
    expect(mongoose.connect).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Erro de conexão com o banco de dados:",
      error
    );
    
    consoleSpy.mockRestore();
  });
    
});