import Part from "./Part";
import { CoursePart } from "../App";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((coursePart) => (
        <div key={coursePart.name}>
          <p style={{ fontWeight: 600 }}>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
          <Part coursePart={coursePart} />
        </div>
      ))}
    </>
  );
};

export default Content;
