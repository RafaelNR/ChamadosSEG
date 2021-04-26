import React from "react";
import { Redirect } from 'react-router-dom'
import useUser from '../../Hooks/useUser';


export default () => {
  const { roleID } = useUser();
  return (
    <>
      { roleID !== 3 ? <Redirect to='/relatorios/atividades' /> :  <Redirect to='/relatorios/atividades/my' />}
    </>
  );
};
