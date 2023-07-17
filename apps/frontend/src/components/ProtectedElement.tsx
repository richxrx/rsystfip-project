import { IPropsProtected } from "../interfaces/IPropsProtected";

function ProtectedElement({
  children,
  isAllowed,
}: IPropsProtected): React.JSX.Element | undefined {
  return isAllowed ? children : undefined;
}

export default ProtectedElement;
