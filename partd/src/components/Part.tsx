import { CoursePart } from "../App";

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  const displayPart = (coursePart: CoursePart) => {
    switch (coursePart.type) {
      case "normal":
        return coursePart.description;
      case "submission":
        return `${coursePart.description}
        submit to ${coursePart.exerciseSubmissionLink}`;
      case "groupProject":
        return `project exercises: ${coursePart.groupProjectCount}`;
      case "special":
        return `${coursePart.description}
        required skills: ${coursePart.requirements.join(", ")}`;
      default:
        return;
    }
  };
  return <em style={{ whiteSpace: "pre-line" }}>{displayPart(coursePart)}</em>;
};

export default Part;
