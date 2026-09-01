import { useState } from "react";

function Produto() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [tipo, setTipo] = useState("");
    const [mensagem, setMensagem] = useState("");

    function mudarTipo(e) {
        setTipo(e.target.value);
    }

    async function cadastrarProduto() {
        //  └─ sem (e) aqui: nada a tratar, o valor já está no estado
        const resposta = await fetch(
            "http://localhost:8080/produto",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        nome: nome,
                        descricao: descricao,
                        preco: preco,
                        quantidade: quantidade,
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
        <div>

            <h2>Cadastrar produto novo!</h2>
            <div>
                Nome do produto: <br></br>
                <input
                    type="text"
                    placeholder="ex: Cheeseburguer"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <br />

                Descrição do produto: <br />
                <input
                    type="text"
                    placeholder="ex: Hamburguer com queijo"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                /><br />

                Preço do Produto:<br />
                <input
                    type="textx"
                    placeholder="ex:20.00"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                /><br />

                Quantidade do produto:<br />
                <input
                    type="number"
                    placeholder="ex: 2"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                /><br />

                Tipo do produto: <br />
                <select value={tipo} onChange={mudarTipo}>
                    <option value="lanche">Lanche</option>
                    <option value="bebida">Bebida</option>
                    <option value="sobremesa">Sobremesa</option>
                    <option value="refeicao">Refeição</option>
                </select><br />

                {/* <input
                type="text"
                placeholder="Escolha o tipo"
                value={tipo}
                onChange={(e) => setDescricao(e.target.value)}/> */
                }

            </div>


            <button onClick={cadastrarProduto}>Enviar</button>
            <p>{mensagem}</p>
        </div>
    )
}

export default Produto;