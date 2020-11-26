import * as yup from "yup";
import Validate from "../Utils/Validate";

const InsertSchema = (data) => {
  const schema = yup.object().shape({
    nome: yup
      .string()
      .min(3, "No mínimo 3 Caracteres")
      .max(100, "No máximo 100 caracteres")
      .required("Nome da categoria é obrigatório"),
    subCategorias: yup
      .array()
      .required("Pelo menos uma Sub-Categoria é obrigatória."),
  });

  const Val = new Validate(schema, data);
  return Val.exec();
};

const UpdateSchema = async (data) => {
  const schema = yup.object().shape({
    id: yup.number().required(),
    nome: yup
      .string()
      .min(3, "No mínimo 3 Caracteres")
      .max(100, "No máximo 100 caracteres")
      .required("Nome da categoria é obrigatório"),
    subCategorias: yup
      .array()
      .required("Pelo menos uma Sub-Categoria é obrigatória."),
  });
  const Val = new Validate(schema, data);
  return await Val.exec();
};

export { InsertSchema, UpdateSchema };
