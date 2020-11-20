import React from "react";
import AtividadeCreate from '../../Components/Forms/AtividadeCreate';
import InfoCreate from '../../Components/Forms/InfoCreate'

export default () => {
  const [atividadeID, setAtividadeID] = React.useState(null); //! null
  const [ ticket, setTicket ] = React.useState(null) //! null
  const [infos, setInfos] = React.useState(0); //! 0

  function incrementInfos(){
    setInfos(_ => infos+1);
  }

  let rows = []
  for (let i = 0; i < infos; i++) {
    rows.push(i);
  }
  
	return (
    <React.Fragment>
      <AtividadeCreate setAtividadeID={setAtividadeID} setTicket={setTicket} newInfo={incrementInfos} />

      { 
        rows.map((id) => {  
          return <InfoCreate key={id} newInfo={incrementInfos} atividadeID={atividadeID} ticket={ticket} />
        })
      }

		</React.Fragment>
  );

};