import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogOutMutation } from "../../redux/api/userApiSlice";
import { logOutUser } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log("user", userInfo);
  const [logOut, { isLoading }] = useLogOutMutation();
  //handel logout user
  const handelLogoutUser = async () => {
    try {
      const res = await logOut();
      console.log("res..logout", res);
      if (res.error) {
        toast.error(res?.error?.data?.message || res.error);
      }
      dispatch(logOutUser());
      toast.success(`${res?.data?.message}`);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <div className="bg-gray-800 py-6">
        <div className="sm:flex  justify-around ">
          <div className="text-white flex gap-4 justify-center">
            <p>
              <Link to="/">Home</Link>
            </p>
          </div>
          <div className="text-white  text-center">
            {userInfo?.email ? (
              <div className="gap-4">
                <button onClick={() => handelLogoutUser()}>Logout</button>{" "}
                <small> - ({userInfo?.name})</small>{" "}
              </div>
            ) : (
              <>
                <button>
                  <Link to="/signIn"> Login</Link>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
