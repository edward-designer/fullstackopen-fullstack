interface IexCalInputs {
  exerciseTime: Array<number>;
  targetTime: number;
}

interface IexerciseCalculator {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgumentsExerciseTime = (args: Array<string>): IexCalInputs => {
  if (args.length < 4)
    throw new Error("Incorrect number of arguments provided");
  const [targetTime, ...exerciseTime] = args.slice(2);
  if (!Number.isNaN(Number(targetTime))) {
    return {
      exerciseTime: exerciseTime
        .map((time) => Number(time))
        .filter((time) => !Number.isNaN(time)),
      targetTime: Number(targetTime),
    };
  } else {
    throw new Error("Invalid arguments");
  }
};

const exerciseCalculator = (
  exerciseTime: Array<number>,
  targetTime: number
): IexerciseCalculator => {
  const ratingDescriptionText = [
    "Could be better!",
    "Well done! Keep it up!",
    "Fantastic, you smashed it!",
  ];
  const periodLength = exerciseTime.length;
  const trainingDays = exerciseTime.filter((day) => day).length;
  const average =
    exerciseTime.reduce((acc, day) => acc + day, 0) / periodLength;
  const success = average >= targetTime;
  const rating =
    average / targetTime < 1 ? 1 : average / targetTime < 2 ? 2 : 3;
  const ratingDescription = ratingDescriptionText[rating - 1];
  const target = targetTime;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { exerciseTime, targetTime } = parseArgumentsExerciseTime(process.argv);
  console.log(exerciseCalculator(exerciseTime, targetTime));
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error: ${error.message}`);
  }
}
