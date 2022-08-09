interface BMIInputs {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BMIInputs => {
  if (args.length !== 4)
    throw new Error("Incorrect number of arguments provided");

  if (!Number.isNaN(Number(args[2])) && !Number.isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Invalid arguments");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) return "underweight";
  if (bmi >= 30) return "obese";
  return "Normal (healthy weight)";
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`Error: ${error.message}`);
  }
}
