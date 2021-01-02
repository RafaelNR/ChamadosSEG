import * as yup from "yup";
import Validate from "../Utils/Validate";

const ReportAtividadesSchema = (Dados, { data, info }) => {

  let schema;

  if (data === 'periodo' && info === 'tecnico') {
    schema = yup.object().shape({
      ano: yup.number().positive().integer().min(2020).max(2030).required("Ano é requerido."),
      mes: yup.number().positive().integer().min(1).max(12).required("Mes é requerido."),
      tecnico: yup.number().positive().integer().min(1).max(99).required("Técnico é requerido."),
    });
  } else if (data === 'periodo' && info === 'cliente') {
    schema = yup.object().shape({
      ano: yup
        .number()
        .positive()
        .integer()
        .min(2020)
        .max(2030)
        .required('Ano é requerido.'),
      mes: yup
        .number()
        .positive()
        .integer()
        .min(1)
        .max(12)
        .required('Mes é requerido.'),
      cliente: yup.number().positive().integer().min(1).max(99).required("Cliente é requerido.")
    });
  } else if (data === 'datas' && info === 'tecnico') {
    schema = yup.object().shape({
      tecnico: yup.number().positive().integer().min(1).max(99).required("Técnico é requerido."),
      data_inicial: yup.date().required("Data inicial é requerido."),
      data_final: yup.date().required('Data final é requerido.'),
    });
  } else if (data === 'datas' && info === 'cliente') {
    schema = yup.object().shape({
      cliente: yup.number().positive().integer().min(1).max(99).required("Cliente é requerido."),
      data_inicial: yup.date().required('Data inicial é requerido.'),
      data_final: yup.date().required('Data final é requerido.'),
    });
  } else {
    throw new Error('Sem Dados vinculados');
  }

  const Val = new Validate(schema, Dados);
  return Val.exec();
};


export { ReportAtividadesSchema};