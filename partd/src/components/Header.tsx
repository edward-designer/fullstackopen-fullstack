interface IHeaderProps {
  courseName: string;
}
const Header = ({ courseName }: IHeaderProps) => {
  return <h1>{courseName}</h1>;
};

export default Header;
