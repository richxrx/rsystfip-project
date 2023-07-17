interface IProps {
  children: Array<React.JSX.Element>;
}

function Responsive({ children }: IProps): React.JSX.Element {
  return <div className="table-responsive">{children}</div>;
}

export default Responsive;
