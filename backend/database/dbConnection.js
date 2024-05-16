import mongoose from "mongoose";
import chalk from "chalk";

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.CONNECTION, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });

    const chocolate = chalk.hex("#c66b27");
    const almond = chalk.hex("#efdecd");

    console.log(
      chocolate(
        chalk.bold("CONNECTION:"),
        almond(
          chalk.bold(mongoose.connection.name.toUpperCase()),
          mongoose.connection.host
        )
      )
    );
  } catch (error) {
    process.exit(1);
    console.log(chocolate(chalk.bold("CONNECTION FAILED")));
  }
};

export default dbConnection;
