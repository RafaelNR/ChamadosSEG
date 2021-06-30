import * as yup from 'yup';
import Validate from '../Utils/Validate';

const InsertSchema = (data) => {
  const schema = yup.object().shape({
    titulo: yup.string().trim().required('Titulo é requerido.'),
    descricao: yup.string().required('Descrição é requerida.'),
    categoria_id: yup.number().required('Categoria é requerido.'),
    sub_categoria_id: yup.number().required('Sub-categoria é requerido.')
  });

  const Val = new Validate(schema, data);
  return Val.exec();
};

const UpdateSchema = (data) => {

  const schema = yup.object().shape({
    id: yup.number().required('ID é requerido'),
    titulo: yup.string().trim().required('Titulo é requerido.'),
    descricao: yup.string().required('Descrição é requerida.'),
    categoria_id: yup.number().required('Categoria é requerido.'),
    sub_categoria_id: yup.number().required('Sub-categoria é requerido.')
  });

  const Val = new Validate(schema, data);
  return Val.exec();
};

export {
  InsertSchema,
  UpdateSchema,
};
