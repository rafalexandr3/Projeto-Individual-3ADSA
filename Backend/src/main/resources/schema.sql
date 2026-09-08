CREATE TABLE produto
(
    id              INT AUTO_INCREMENT PRIMARY KEY,
    nome            VARCHAR(255) NOT NULL,
    descricao       VARCHAR(100),
    preco           DECIMAL(10,2),
    disponibilidade BOOLEAN,
    tipo            VARCHAR(100)
);