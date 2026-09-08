import { useState } from "react";
import styles from "./Produto.module.css";

function Produto() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [disponibilidade, setDisponibilidade] = useState("");
    const [tipo, setTipo] = useState("");
    const [mensagem, setMensagem] = useState("");

    function mudarTipo(e) {
        setTipo(e.target.value);
    }

    async function cadastrarProduto() {
        //  └─ sem (e) aqui: nada a tratar, o valor já está no estado
        const resposta = await fetch(
            "http://localhost:8080/produtos",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        nome: nome,
                        descricao: descricao,
                        preco: preco,
                        disponibilidade: disponibilidade,
                        tipo: tipo
                    }
                )
            }
        );

        if (!resposta.ok) {
            //          └─ status fora de 200–299: deu errado
            setMensagem("Erro " + resposta.status);
            return;
        }

        if (!resposta.ok) {
            setMensagem("Erro " + resposta.status);
            return;
        }
        //      └─ converte o corpo JSON da resposta em objeto JS
        setMensagem("Produto cadastrado com sucesso");
        //      └─ a resposta do servidor vira estado — e vira tela
    }


    return (
         <div className={styles.container}>

            <h2 className={styles.titulo}>
                Cadastrar novo produto
            </h2>

            <div className={styles.formulario}>

                <label>Nome do produto:</label>
                <input
                    type="text"
                    placeholder="Ex: Cheeseburger"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <label>Descrição do produto:</label>
                <input
                    type="text"
                    placeholder="Ex: Hambúrguer com queijo"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <label>Preço do produto:</label>
                <input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 20.00"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                />

                <label>Disponibilidade:</label>
                <select
                    value={disponibilidade}
                    onChange={(e) =>
                        setDisponibilidade(e.target.value === "true")
                    }
                >
                    <option value="true">Disponível</option>
                    <option value="false">Indisponível</option>
                </select>

                <label>Tipo do produto:</label>
                <select
                    value={tipo}
                    onChange={mudarTipo}
                >
                    <option value="">Escolha um tipo</option>
                    <option value="lanche">Lanche</option>
                    <option value="bebida">Bebida</option>
                    <option value="sobremesa">Sobremesa</option>
                    <option value="refeicao">Refeição</option>
                </select>

                <button
                    className={styles.botao}
                    onClick={cadastrarProduto}
                >
                    Cadastrar produto
                </button>

                <p className={styles.mensagem}>
                    {mensagem}
                </p>

            </div>

        </div>
    );
}

export default Produto;