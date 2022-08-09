export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) return "underweight";
  if (bmi >= 30) return "obese";
  return "Normal (healthy weight)";
};

interface IexerciseCalculator {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const exerciseCalculator = (
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
