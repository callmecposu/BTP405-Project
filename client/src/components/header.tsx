const Header = ({ user }: any) => {
    return (
        <div className="navbar bg-primary py-2">
            <img src="home_logo.svg" width="200px" alt="" />
            <div className="flex w-full justify-end">
                <span className=" text-xl text-slate-100 font-light">
                    {user.username}
                </span>
                <div className="dropdown dropdown-bottom dropdown-end">
                    <div
                        tabIndex={0}
                        className="avatar placeholder"
                        role="button"
                    >
                        <div className="w-12 mx-4 bg-secondary rounded-full">
                            <span className="font-semibold text-primary">
                                {user.first_name[0]}
                                {user.last_name[0]}
                            </span>
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="mt-2 border-4 border-secondary dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52"
                    >
                        <li>My Profile</li>
                        <li>Logout</li>
                    </ul>
                </div>
            </div>
        </div>

        // <div className="navbar bg-primary py-2">
        //     <div className="navbar-start">
        //         <div className="dropdown">
        //             <div
        //                 tabIndex={0}
        //                 role="button"
        //                 className="btn btn-ghost btn-circle"
        //             >
        // <svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     className="h-5 w-5"
        //     fill="none"
        //     viewBox="0 0 24 24"
        //     stroke="currentColor"
        // >
        //     <path
        //         strokeLinecap="round"
        //         strokeLinejoin="round"
        //         strokeWidth="2"
        //         d="M4 6h16M4 12h16M4 18h7"
        //     />
        // </svg>
        //             </div>
        //             <ul
        //                 tabIndex={0}
        //                 className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        //             >
        //                 <li>
        //                     <a>Homepage</a>
        //                 </li>
        //                 <li>
        //                     <a>Portfolio</a>
        //                 </li>
        //                 <li>
        //                     <a>About</a>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        //     <div className="navbar-center">
        //         <img src="home_logo.svg" width="200px" alt="" />
        //     </div>
        //     <div className="navbar-end">
        //         <div className="dropdown dropdown-end">
        //             <div
        //                 tabIndex={0}
        //                 role="button"
        //                 className="btn btn-ghost btn-circle avatar"
        //             >
        //                 <div className="w-10 rounded-full">
        //                     <img
        //                         alt="Tailwind CSS Navbar component"
        //                         src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        //                     />
        //                 </div>
        //             </div>
        //             <ul
        //                 tabIndex={0}
        //                 className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        //             >
        //                 <li>
        //                     <a className="justify-between">
        //                         Profile
        //                         <span className="badge">New</span>
        //                     </a>
        //                 </li>
        //                 <li>
        //                     <a>Logout</a>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </div>
    );
};

export default Header;
