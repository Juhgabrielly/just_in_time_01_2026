CREATE DATABASE IF NOT EXISTS preparacao_db;

USE preparacao_db;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    custo DECIMAL(10,2) NOT NULL,
    quant_estoque INT NOT NULL DEFAULT 0,
    estoq_minimo INT NOT NULL DEFAULT 0
);

CREATE TABLE movimentacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    tipo ENUM('FABRICADO', 'PEDIDO') NOT NULL,
    data DATE NOT NULL,

    CONSTRAINT fk_movimentacao_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id),

    CONSTRAINT fk_movimentacao_produto
        FOREIGN KEY (id_produto)
        REFERENCES produto(id)
);


-- ============================================
-- DADOS DA TABELA USUARIO
-- ============================================

INSERT INTO usuario (nome, email, senha) VALUES
('Julia Silva', 'julias@email.com', '123456'),
('Sayury Santos', 'sayurys@email.com', '123456'),
('Carlos Oliveira', 'carlos@email.com', '123456');


INSERT INTO produto 
(nome, descricao, custo, quant_estoque, estoq_minimo) 
VALUES
('Prateleira MDF', 'Prateleira fabricada em MDF de 15mm', 45.90, 20, 5),
('Mesa MDF', 'Mesa de MDF para escritório', 180.00, 10, 3),
('Nicho MDF', 'Nicho decorativo fabricado em MDF', 35.50, 15, 5);


INSERT INTO movimentacao 
(id_usuario, id_produto, quantidade, tipo, data) 
VALUES
(1, 1, 10, 'FABRICADO', '2026-09-01'),
(2, 2, 2, 'PEDIDO', '2026-09-02'),
(3, 3, 5, 'FABRICADO', '2026-09-03');


SELECT * FROM usuario;

SELECT * FROM produto;

SELECT * FROM movimentacao;