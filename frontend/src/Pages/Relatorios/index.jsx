import React from "react";
import { Redirect } from 'react-router-dom'
import Typography from "@material-ui/core/Typography";
import useUser from '../../Hooks/useUser';


export default () => {
  const { roleID } = useUser();
  return (
    <>
      <Typography>Relatórios</Typography>
      { roleID !== 3 ? <Redirect to='/relatorios/atividades' /> :  <Redirect to='/relatorios/atividades/my' />}
    </>
  );
};
