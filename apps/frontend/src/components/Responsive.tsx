interface IProps {
  children: Array<React.ReactNode>;
}

function Responsive({ children }: IProps): React.ReactNode {
  return <div className="table-responsive">{children}</div>;
}

export default Responsive;
