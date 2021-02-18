import * as yup from "yup";
import Validate from "../Utils/Validate";

const InsertSchema = (data) => {
  const schema = yup.object().shape({
    nome: yup
      .string()
      .min(6, "No mínimo 6 Caracteres")
      .max(100, "No máximo 100 caracteres")
      .required("Nome é obrigatório"),
    email: yup
      .string()
      .email("Digite um email válido")
      .required("Email é obrigatório"),
    passwd: yup
      .string()
      .min(3, "No mínimo 3 caracteres")
      .max(15, "No máximo 15 caracteres")
      .required("Senha é obrigatório"),
    user: yup
      .string()
      .min(3, "No mínimo 3 caracteres")
      .max(30, "No máximo 30 caracteres")
      .required("Usuário é obrigatório"),
    telefone: yup
      .string()
      .min(14, "No mínimo 14 caracteres")
      .max(20, "No máximo 20 caracteres")
      .required("Telefone é obrigatório"),
    role_id: yup.number().min(0).max(99).required("Perfil é obrigatório."),
    clients: yup.array().required("Pelo menos um cliente é obrigatório."),
  });

  const Val = new Validate(schema, data);
  return Val.exec();
};

const UpdateSchema = (data) => {
  const schema = yup.object().shape({
    id: yup.number().required(),
    nome: yup
      .string()
      .min(6, "No mínimo 6 Caracteres")
      .max(100, "No máximo 100 caracteres")
      .required("Nome é obrigatório"),
    email: yup
      .string()
      .email("Digite um email válido")
      .required("Email é obrigatório"),
    passwd:
      data.passwd === "******"
        ? yup.string()
        : yup
            .string()
            .min(3, "No mínimo 3 caracteres")
            .max(15, "No máximo 15 caracteres")
            .required("Senha é obrigatório"),
    telefone: yup
      .string()
      .min(14, "No mínimo 14 caracteres")
      .max(20, "No máximo 20 caracteres")
      .required("Telefone é obrigatório"),
    role_id: yup
      .number()
      .notRequired()
      .min(0)
      .max(99)
      .required("Perfil é obrigatório."),
    clients: yup.array().required("Pelo menos um cliente é obrigatório."),
  });

  const Val = new Validate(schema, data);
  return Val.exec();
};

const DisabledSchema = (data) => {
  const schema = yup.number().required();

  const Val = new Validate(schema, data);
  return Val.exec();
};


const LoginSchema = (data) => {
  const schema = yup.object().shape({
    user: yup
      .string()
      .nullable()
      .min(3, 'No mínimo 3 Caracteres')
      .max(30, 'No máximo 30 caracteres')
      .required('Usuário é obrigatório'),
    passwd: yup
      .string()
      .nullable()
      .min(3, 'No mínimo 3 caracteres')
      .max(15, 'No máximo 15 caracteres')
      .required('Senha é obrigatório')
  });

  const Val = new Validate(schema, data);
  return Val.exec();
}

export { InsertSchema, UpdateSchema, DisabledSchema, LoginSchema };
