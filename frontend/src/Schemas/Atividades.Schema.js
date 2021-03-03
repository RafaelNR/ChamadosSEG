import * as yup from "yup";
import Validate from "../Utils/Validate";
import { dateMoreDays } from "../Utils/dates";

const InsertSchema = (data) => {
  const schema = yup.object().shape({
    date: yup
      .date()
      .min(dateMoreDays(new Date(), 15), "Data deve ser maior.")
      .max(new Date(), "Data deve ser menor.")
      .required("Data é requerido"),
    cliente_id: yup.string().required("Cliente é requerido"),
  });

  const Val = new Validate(schema, data);
  return Val.exec();
};

const InsertInfoSchema = (data) => {
  const schema = yup.object().shape({
    descricao: yup.string().required("Descrição é requerido"),
    atividade_id: yup.number().required("Atividade é requerida."),
    ticket: yup.number().required("Atividade é ticket."),
    categoria_id: yup.number().required("Categoria é requerida."),
  });

  const Val = new Validate(schema, data);
  return Val.exec();
};

const UpdateInfoSchema = (data) => {
  const schema = yup.object().shape({
    id: yup.string().required("Descrição é requerido"),
    descricao: yup.string().required("Descrição é requerido"),
    categoria_id: yup.number().required("Categoria é requerida."),
  });

  const Val = new Validate(schema, data);
  return Val.exec();
};


const FilterAtividadesSchema = (data) => {
  const schema = yup.object().shape({
    data_inicial: yup.string(),
    data_final: yup.string(),
    cliente: yup.number(),
    tecnico: yup.number().required('Técnico é necessário.')
  });

  const Val = new Validate(schema, data);
  return Val.exec();
};

export {
  InsertSchema,
  InsertInfoSchema,
  UpdateInfoSchema,
  FilterAtividadesSchema
};
