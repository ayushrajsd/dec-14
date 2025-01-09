import React, { useEffect } from "react";
import { GetCurrentUser } from "../../api/users";

function Home() {
  // useEffect(() => {
  //   console.log(" Home useEffect");
  //   const fetchUser = async () => {
  //     const response = await GetCurrentUser();
  //     console.log(response);
  //   };
  //   fetchUser();
  // });
  return <div>This is my Home page</div>;
}

export default Home;
