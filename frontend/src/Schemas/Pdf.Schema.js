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
      data_inicial: yup.string().required("Data inicial é requerido."),
      data_final: yup.string().required('Data final é requerido.'),
    });
  } else if (data === 'datas' && info === 'cliente') {
    schema = yup.object().shape({
      cliente: yup
        .number()
        .positive()
        .integer()
        .min(1)
        .max(99)
        .required('Cliente é requerido.'),
      data_inicial: yup.string().required('Data inicial é requerido.'),
      data_final: yup.string().required('Data final é requerido.')
    });
  } else {
    throw new Error('Sem Dados vinculados');
  }

  const Val = new Validate(schema, Dados);
  return Val.exec();
};


const GerarLiberacaoTotalSchema = (data) => {
  const schema = yup.object().shape({
    ip: yup
      .string()
      .min(11, 'IP inválido')
      .max(14, 'IP inválido')
      .required('IP é requerido.'),
    mac: yup
      .string()
      .length(17, 'Tamanho do MAC não é valido')
      .required('MAC é requerido.'),
    dispositivo: yup.string().trim().required('Dispositivo é requerido.'),
    setor: yup.string().trim().required('Setor é requerido.'),
    usuario: yup.string().trim().required('Usuário é requerida.'),
    justificativa: yup.string().trim().required('Justificativa é requerido.'),
    tempo: yup.string()
  });

  const Val = new Validate(schema, data);
  return Val.exec();
}

const GerarLiberacaoSiteAppSchema = (data) => {
  const schema = yup.object().shape({
    ip: yup
      .string()
      .min(11, 'IP inválido')
      .max(14, 'IP inválido')
      .required('IP é requerido.'),
    mac: yup
      .string()
      .length(17, 'Tamanho do MAC não é valido')
      .required('MAC é requerido.'),
    dispositivo: yup.string().trim().required('Dispositivo é requerido.'),
    setor: yup.string().trim().required('Setor é requerido.'),
    usuario: yup.string().trim().required('Usuário é requerida.'),
    justificativa: yup.string().trim().required('Justificativa é requerido.'),
    lista: yup.string().trim().required('Lista de Site ou aplicativos é requerida.'),
    tempo: yup.string()
  });

  const Val = new Validate(schema, data);
  return Val.exec();
}


export {
  ReportAtividadesSchema,
  GerarLiberacaoTotalSchema,
  GerarLiberacaoSiteAppSchema
};