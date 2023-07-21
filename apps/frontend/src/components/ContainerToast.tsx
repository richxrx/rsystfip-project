import { ToastContainer, Bounce } from "react-toastify";

function ContainerToast(): React.ReactNode {
  return (
    <ToastContainer
      position={"top-right"}
      autoClose={3000}
      hideProgressBar
      newestOnTop
      transition={Bounce}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      limit={3}
      theme="dark"
    />
  );
}

export default ContainerToast;
