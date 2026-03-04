CREATE DATABASE suloskaja
DEFAULT CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

USE suloskaja;

CREATE TABLE kaja (
    id INT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    ar INT NOT NULL,
    finomsag BOOLEAN,
    lejarat DATE NOT NULL,
    mennyiseg INT NOT NULL
);