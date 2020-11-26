import * as yup from "yup";
import Validate from "../Utils/Validate";

export default (data) => {
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
    role_id: yup.number().min(0).max(99).required("Perfil é obrigatório."),
  });

  const Val = new Validate(schema, data);
  return Val.exec();
};