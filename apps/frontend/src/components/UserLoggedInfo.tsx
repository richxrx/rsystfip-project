import { AuthState } from "../features/auth/authSlice";
import { useAppSelector } from "../hooks";

function UserLoggedInfo(): React.ReactNode {
  const authState: AuthState = useAppSelector(({ auth }) => auth);

  return (
    <h1 className="h3">
      {`${
        authState.userAuth.role_name === "secretaria"
          ? "Bienvenida"
          : "Bienvenido"
      } ${authState.userAuth.role_name}: ${authState.userAuth.first_name} ${
        authState.userAuth.last_name
      }`}
    </h1>
  );
}

export default UserLoggedInfo;
