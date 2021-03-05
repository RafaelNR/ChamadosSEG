import { useCallback } from "react";
import VMasker from "vanilla-masker";

function useMasker() {

  const maskerDoc = useCallback((value:string):string => {
    const docMask = ["999.999.999-999", "99.999.999/9999-99"];
    return inputHandler(docMask, 14, value);
  }, []);

  const maskerTel = useCallback((value:string):string => {
    const telMask = ["(99) 9999-9999", "(99) 99999-9999"];
    return inputHandler(telMask, 14, value);
  }, []);

  const maskerContrato = useCallback((value:string):string => {
    const Mask = ['999-9999', '9999-9999'];
    return inputHandler(Mask, 8, value);
  }, []);

  const maskerTicket = (value: string): string => {
    const Masks = [
      '9.99999999',
      '99.99999999',
      '999.99999999',
      '9999.99999999',
      '99999.99999999'
    ];
    return handleMasks(Masks, value);
  }

  const inputHandler = (masks: string[], max: number, value: string):string => {
    const v = value.replace(/\D/g, "");
    const m = value.length > max ? 1 : 0;
    const t = VMasker.toPattern(v, masks[m]);
    return t;
  }

  const handleMasks = (masks: string[], value: string): string => {
    const v = value.replace(/\D/g, '');
    const m = masks.filter((mask) =>
      mask.length === value.length ? mask : ''
    );
    const t = VMasker.toPattern(
      v,
      m.length === 0 ? masks[masks.length - 1] : m[0]
    );
    return t;
  }


  const Masker = (value: string, name: string) => {
    switch (name) {
      case 'telefone':
        return maskerTel(value);
      case 'cnpj_cpf':
        return maskerDoc(value);
      case 'n_contrato':
        return maskerContrato(value);
      case 'ticket':
        return maskerTicket(value);
      default:
        return value;
    }
  };

  return { Masker };
}

export default useMasker;
