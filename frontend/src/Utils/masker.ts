import VMasker from "vanilla-masker";

function Masker(value: string, name: string): string {
  console.log(name)
  switch (name) {
    case "telefone":
      return maskerTel(value);
    case "cnpj_cpf":
      return maskerDoc(value);
    case "n_contrato":
      return maskerContrato(value);
    default:
      return value;
  }
}

function maskerDoc(value: string): string {
  const docMask = ["999.999.999-999", "99.999.999/9999-99"];
  return inputHandler(docMask, 14, value);
}

function maskerTel(value: string): string {
  const telMask = ["(99) 9999-9999", "(99) 99999-9999"];
  return inputHandler(telMask, 14, value);
}

function maskerContrato(value: string): string {
  const telMask = ["999-9999", "9999-9999"];
  return inputHandler(telMask, 9, value);
}

function inputHandler(masks: string[], max: number, value: string): string {
  const v = value.replace(/\D/g, "");
  const m = value.length > max ? 1 : 0;
  const t = VMasker.toPattern(v, masks[m]);
  return t;
}

export default Masker;
