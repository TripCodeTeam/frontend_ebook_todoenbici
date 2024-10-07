import React from "react";

function PerfilUser({params}: {params: { username: string }}) {
  return (
    <>
    <p>{params.username}</p>
    </>
  );
}

export default PerfilUser;
