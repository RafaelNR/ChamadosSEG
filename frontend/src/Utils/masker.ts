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
    case "ticket":
      return maskerTicket(value);
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

function maskerTicket(value: string): string {
  const Masks = ["9.99999999","99.99999999","999.99999999","9999.99999999", "99999.99999999"];
  return handleMasks(Masks, value);
}

function inputHandler(masks: string[], max: number, value: string): string {
  const v = value.replace(/\D/g, "");
  const m = value.length > max ? 1 : 0;
  const t = VMasker.toPattern(v, masks[m]);
  return t;
}

function handleMasks(masks: string[], value: string): string { 
  const v = value.replace(/\D/g, "");
  const m = masks.filter(mask => mask.length === value.length ? mask : '')
  const t = VMasker.toPattern(v, m.length === 0 ? masks[masks.length -1] : m[0]);
  return t;
}

export default Masker;
