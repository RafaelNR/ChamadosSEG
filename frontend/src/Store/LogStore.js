export default (Action) =>({
  'index': 'Listagem de elementos',
  'findOne': 'Listado um elemento',
  'insert': 'Elemento inserido',
  'update': 'Elemento alterado',
  'Atividade': `Gerado PDF de ${Action}`
}) [Action] || 'Menssagem não encontrada.';