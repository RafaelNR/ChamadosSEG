import * as yup from "yup";
import Validate from "../Utils/Validate";

const InsertSchema = (data) => {
  const schema = yup.object().shape({
    nome_fantasia: yup
      .string()
      .min(3, "No mínimo 3 Caracteres")
      .max(100, "No máximo 100 caracteres")
      .required("Nome Fantasia é obrigatório"),
    razao_social: yup
      .string()
      .min(10, "No mínimo 10 caracteres")
      .max(100, "No máximo 100 caracteres")
      .required("Razao Social é obrigatório"),
    cnpj_cpf: yup
      .string()
      .min(10, "No mínimo 10 caracteres")
      .max(30, "No máximo 30 caracteres")
      .required("CNPJ/CPF é obrigatório"),
    email: yup
      .string()
      .email("Digite um email válido")
      .min(10, "No mínimo 10 caracteres")
      .max(70, "No máximo 70 caracteres")
      .required("email é obrigatório"),
    telefone: yup
      .string()
      .min(14, "No mínimo 14 caracteres")
      .max(20, "No máximo 20 caracteres")
      .required("Telefone é obrigatório"),
    representante: yup
      .string()
      .min(3, "No mínimo 3 caracteres")
      .max(100, "No máximo 100 caracteres")
      .required("Representante é obrigatório"),
  });

  const Val = new Validate(schema, data);
  return Val.exec();
};

const UpdateSchema = async (data) => {
  const schema = yup.object().shape({
    id: yup.number().required(),
    nome_fantasia: yup
      .string()
      .min(3, "No mínimo 3 Caracteres")
      .max(100, "No máximo 100 caracteres")
      .required("Nome Fantasia é obrigatório"),
    razao_social: yup
      .string()
      .min(10, "No mínimo 10 caracteres")
      .max(100, "No máximo 100 caracteres")
      .required("Razao Social é obrigatório"),
    cnpj_cpf: yup
      .string()
      .min(10, "No mínimo 10 caracteres")
      .max(30, "No máximo 30 caracteres")
      .required("CNPJ/CPF é obrigatório"),
    email: yup
      .string()
      .email("Digite um email válido")
      .min(10, "No mínimo 10 caracteres")
      .max(70, "No máximo 70 caracteres")
      .required("email é obrigatório"),
    telefone: yup
      .string()
      .min(14, "No mínimo 14 caracteres")
      .max(20, "No máximo 20 caracteres")
      .required("Telefone é obrigatório"),
    representante: yup
      .string()
      .min(3, "No mínimo 3 caracteres")
      .max(100, "No máximo 100 caracteres")
      .required("Representante é obrigatório"),
  });
  const Val = new Validate(schema, data);
  return await Val.exec();
};

const DisabledSchema = (data) => {
  const schema = yup.number().required();
  const Val = new Validate(schema, data);
  return Val.exec();
};

export { InsertSchema, UpdateSchema, DisabledSchema };
