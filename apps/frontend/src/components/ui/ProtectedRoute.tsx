import { Navigate, Outlet } from 'react-router-dom';

interface IProps {
  children?: React.ReactNode;
  isAllowed: boolean;
  navigateTo?: string;
}

function ProtectedRoute({
  children,
  isAllowed,
  navigateTo = '/signin',
}: IProps): React.ReactNode {
  if (!isAllowed) return <Navigate to={navigateTo} />;
  return children || <Outlet />;
}

export default ProtectedRoute;
