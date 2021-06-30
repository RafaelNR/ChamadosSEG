import * as yup from 'yup';
import Validate from '../Utils/Validate';

const InsertSchema = (data) => {
  const schema = yup.object().shape({
    requerente: yup.number().required('Usuário requerente é requerido.'),
    atribuido: yup.number().required('Usuário atribuído é requerido.'),
    cliente_id: yup.number().required('Cliente é requerido.'),
    titulo: yup.string().trim().required('Titulo é requerido.'),
    descricao: yup.string().required('Descrição é requerida.'),
    categoria_id: yup.number().required('Categoria é requerido.'),
    sub_categoria_id: yup.number().required('Sub-categoria é requerido.')
  });

  const Val = new Validate(schema, data);
  return Val.exec();
};



const UpdateSchema = (data) => {

  const newData = {
    ...data,
    requerente: data.requerente_id,
    atribuido: data.atribuido_id,
  }

  const schema = yup.object().shape({
    id: yup.number().required('ID é requerido'),
    requerente: yup.number().required('Usuário requerente é requerido.'),
    atribuido: yup.number().required('Usuário atribuído é requerido.'),
    cliente_id: yup.number().required('Cliente é requerido.'),
    titulo: yup.string().trim().required('Titulo é requerido.'),
    descricao: yup.string().required('Descrição é requerida.'),
    categoria_id: yup.number().required('Categoria é requerido.'),
    sub_categoria_id: yup.number().required('Sub-categoria é requerido.'),
  });


  const Val = new Validate(schema, newData);
  return Val.exec();
};


const InsertAcompanhamentoSchema = (data) => {
  const schema = yup.object().shape({
    tipo: yup.number().min(1).max(5).required(),
    chamado_id: yup.number().required(),
    descricao: yup.string().required('Descrição é requerida.')
  });
  const Val = new Validate(schema, data);
  return Val.exec();
}

const UpdateAcompanhamentoSchema = (data) => {
  const schema = yup.object().shape({
    id: yup.number().required('ID é requerido.'),
    descricao: yup.string().required('Descrição é requerida.')
  });
  const Val = new Validate(schema, data);
  return Val.exec();
};


export {
  InsertSchema,
  UpdateSchema,
  InsertAcompanhamentoSchema,
  UpdateAcompanhamentoSchema
};
