import { program } from "commander";

program
  .option("-m, --node <mode>", "ambiente a ejecutar", "dev")
  .option("-p, --port <port>", "puerto a utilizar", 8080)
  .option("-d, --debug <debug>", "variable para activar modo debug", false)
  .parse();

console.log("options", program.opts());
