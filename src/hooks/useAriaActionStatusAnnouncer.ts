import { useState, useCallback, useRef, useEffect } from "react";


type Announcer =
{
    ariaMessage: string;
    announce(message: string): Promise<void>;
};

export function useAriaActionStatusAnnouncer(initialDelay: number = 150, clearDelay: number = 100): Announcer
{
    const [ariaMessage, setAriaMessage] = useState<string>("");
    
    // Guarda a referencia para o ID do timeout
    // para garantir a persistencia entre renderizações
    const timeoutRef: React.RefObject<number | null> = useRef<number | null>(null);
    
    const announce = useCallback(async (message: string): Promise<void> =>
    {
        // Espera o DOM estabilizar (ex: depois de fechar um modal etc..)
        await new Promise<void>((resolve) => setTimeout(resolve, initialDelay));
        
        // Limpa para forçar o leitor a tratar a próxima mensagem como "nova"
        setAriaMessage("");
        
        // Limpa um possivel timeout anterior. Caso announce seja
        // chamado muito "rapidamente", "descarta" a mensagem anterior
        // e foca-se na nova
        if (timeoutRef.current !== null)
        {
            clearTimeout(timeoutRef.current);
        }
        
        // Da tempo para o react limpar a mensagem anterior
        // "setAriaMessage("")" antes de criar a nova.
        timeoutRef.current = window.setTimeout(() =>
        {
            setAriaMessage(message);
        
        }, clearDelay);
        
    }, [initialDelay, clearDelay]);
    
    
    useEffect(() =>
    {
        return(() =>
        {
            if (timeoutRef.current !== null)
            {
                clearTimeout(timeoutRef.current);
            }
        });
    
    }, []);
    
    return({ ariaMessage, announce });
}
