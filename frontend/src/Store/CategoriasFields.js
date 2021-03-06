const Insert = [
  {
    id: "nome",
    label: "Nome da Categoria",
    required: true,
    autofocus: true,
    margin: "normal",
    type: "text",
    option: "input",
    value: "",
    media: {
      xs: 12,
      lg: 12,
      md: 12,
      sm: 12,
    },
  },
];

const Update = [
  {
    id: "razao_social",
    label: "Razão Social",
    required: true,
    autofocus: true,
    margin: "normal",
    type: "text",
    option: "input",
    value: "",
    media: {
      xs: 12,
      lg: 12,
      md: 12,
      sm: 12,
    },
  },
  {
    id: "nome_fantasia",
    label: "Nome Fantasia",
    required: true,
    autofocus: false,
    margin: "normal",
    type: "text",
    option: "input",
    value: "",
  },
  {
    id: "cnpj_cpf",
    label: "CNPJ/CPF",
    required: true,
    autofocus: false,
    margin: "normal",
    type: "text",
    option: "input",
    value: "",
  },
  {
    id: "email",
    label: "Email",
    required: true,
    autofocus: false,
    margin: "normal",
    type: "text",
    option: "input",
    value: "",
  },
  {
    id: "telefone",
    label: "Telefones",
    required: true,
    autofocus: false,
    margin: "normal",
    type: "text",
    option: "input",
    value: "",
  },
];

export default { Insert, Update };
