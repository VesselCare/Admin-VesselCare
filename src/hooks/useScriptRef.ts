'use client';

import { useEffect, useRef } from 'react';

// ==============================|| ELEMENT REFERENCE HOOKS ||============================== //

const useScriptRef = () => {
  const scripted = useRef(true);

  useEffect(
    () => () => {
      scripted.current = false;
    },
    []
  );

  return scripted;
};

export default useScriptRef;

/**
 * O componente useScriptRef é um custom hook em React que serve para manter uma referência a um valor booleano que indica se um componente está montado ou não.
Como funciona:
useRef(true): Inicializa uma referência com o valor true, indicando que o componente está montado.
useEffect: Define um efeito que retorna uma função de limpeza. Essa função de limpeza é executada quando o componente é desmontado, e ela define scripted.current como false.
Retorno: O hook retorna a referência scripted, que pode ser usada em outros hooks ou componentes para verificar se o componente ainda está montado.
 */
