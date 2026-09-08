import { useState } from "react";
import styles from "./ListarProdutos.module.css";

function ListarProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);

    async function buscar() {
        setCarregando(true);   // 1) entra no estado 'carregando'
        setErro(null);

        try {
            const resposta = await fetch(
                "http://localhost:8080/produtos"
            );
            if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);

            const dados = await resposta.json();
            setProdutos(dados);           // 2) sucesso: guarda os dados
        } catch (e) {
            setErro(e.message);           // 2) falha: guarda a mensagem
        } finally {
            setCarregando(false);         // 3) sai do carregando nos dois casos
        }
    }

    return (
        
        <div className={styles.container}>

            <h2 className={styles.titulo}>
                Produtos cadastrados
            </h2>

            <button
                className={styles.botao}
                onClick={buscar}
                disabled={carregando}
            >
                {carregando
                    ? "Buscando..."
                    : "Buscar produtos cadastrados"
                }
            </button>

            {erro && (
                <p className={styles.erro}>
                    Erro: {erro}
                </p>
            )}

            {carregando && (
                <p className={styles.carregando}>
                    Carregando produtos...
                </p>
            )}

            <div className={styles.lista}>

                {produtos.map((u) => (

                    <div
                        className={styles.card}
                        key={u.id}
                    >

                        <h3>{u.nome}</h3>

                        <p>{u.descricao}</p>

                        <p>
                            <strong>Preço:</strong>{" "}
                            R$ {Number(u.preco).toFixed(2).replace(".", ",")}
                        </p>

                        <p>
                            <strong>Tipo:</strong>{" "}
                            {u.tipo}
                        </p>

                        <p>
                            <strong>Disponibilidade:</strong>{" "}
                            {u.disponibilidade
                                ? "Disponível"
                                : "Indisponível"
                            }
                        </p>

                        <div className={styles.acoes}>

                            <button className={styles.botaoExcluir} onClick={() => excluirProduto(u.id)} >
                                🗑️
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default ListarProdutos;