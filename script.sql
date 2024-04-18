create schema acme_filmes;
use acme_filmes;

create table tbl_filme(
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    sinopse text not null,
    duracao time not null,
    data_lancamento date not null,
    data_relancamento date,
    foto_capa varchar(200) not null,
    valor_unitario float,
    id_classificacao int not null,
    
    unique key(id),
    unique index(id),
    
    constraint FK_CLASSIFICACAO_FILME
    foreign key(id_classificacao)
    references tbl_classificacao(id)
);

alter table tbl_filme drop column id_genero;

alter table tbl_filme_ator drop constraint FK_FILME_FILMEATOR;
alter table tbl_filme_diretor drop constraint FK_FILME_FILMEDIRETOR;
alter table tbl_filme_genero drop constraint FK_FILME_FILMEGENERO;

select * from tbl_classificacao;
desc tbl_classificacao;

alter table tbl_filme_ator add constraint FK_FILME_FILMEATOR foreign key (id_filme) references tbl_filme(id);
alter table tbl_filme_diretor add constraint FK_FILME_FILMEDIRETOR foreign key (id_filme) references tbl_filme(id);
alter table tbl_filme_genero add constraint FK_FILME_FILMEGENERO foreign key (id_filme) references tbl_filme(id);

show tables;
desc tbl_filme;

select * from tbl_classificacao;

insert into tbl_filme(
	nome,
    sinopse,
    duracao,
    data_lancamento,
    data_relancamento,
    foto_capa,
    valor_unitario,
    id_classificacao
    )values(
		'Todos Menos Você',
        'Baseado no comédia de William Shakespeare, Much Ado About Nothing, Todos Menos Você, é um longa que acompanha Bea (Sydney Sweeney) e Ben (Glen Powell), dois jovens que combinam um encontro após se esbarrarem nos corredores da faculdade em que estudam. Em uma noite quase perfeita, o jovem casal possui tudo para manter o contato: química, uma boa conversa e um incrível desejo um pelo outro. No entanto, o primeiro encontro não passa disso, e a relação de ambos se esfria até pararem de se falar. Anos após a formatura, os dois acabam coincidentemente sendo convidados para o mesmo casamento na Austrália. Longe de casa e dos problemas, os dois acabam fazendo um trato, fingindo ser um casal para todos até o casamento acabar. Mas a tarefa se torna complicada quando os convidados e familiares percebem a antipatia que nutrem um pelo outro, fazendo com que tornem o trabalho mais convincente e os encontros mais frequentes.',
        '1:44:00',
        '2024-01-25',
		null,
        'https://br.web.img3.acsta.net/c_310_420/pictures/23/10/19/16/00/5781108.jpg',
        '40.00',
        5
	),
    (
		'Duna',
        'Inspirado na série de livros de Frank Herbert, Duna se passa em um futuro longínquo. O Duque Leto Atreides administra o planeta desértico Arrakis, também conhecido como Duna, lugar de única fonte da substância rara chamada de "melange", usada para estender a vida humana, chegar a velocidade da luz e garantir poderes sobrehumanos. Para isso ele manda seu filho, Paul Atreides (Timothée Chalamet), um jovem brilhante e talentoso que nasceu para ter um grande destino além de sua imaginação, e seus servos e concubina Lady Jessica (Rebecca Fergunson), que também é uma Bene Gesserit. Eles vão para Duna, afim de garantir o futuro de sua família e seu povo. Porém, uma traição amarga pela posse da melange faz com que Paul e Jessica fujam para os Fremen, nativos do planeta que vivem nos cantos mais longes do deserto.',
        '2:36:00',
        '2021-10-21',
        null,
        'https://br.web.img3.acsta.net/c_310_420/pictures/21/09/29/20/10/5897145.jpg',
        '44.00',
        5
    );
    
    insert into tbl_filme (
                nome,
                sinopse,
                duracao,
                data_lancamento,  
                data_relancamento,
                foto_capa,        
                valor_unitario
            ) values(
                    'Teste',
                    'Teste',
                    '02:00:00',
                    '2024-01-01',
                    '2024-01-01',
                    'Teste',
                    '40'
            );
    

show tables;

update tbl_ator

	set 
		id=1
        
where id=5;

update tbl_ator

	set 
		id=2
        
where id=6;

update tbl_ator

	set 
		id=3
        
where id=7;

update tbl_ator

	set 
		id=4
        
where id=8;

update tbl_diretor

	set 
		id=1
        
where id=3;

update tbl_diretor

	set 
		id=2
        
where id=4;

select  * from tbl_filme;

update tbl_filme 

            set 
                nome='${dadosFilme.nome}',
                sinopse='${dadosFilme.sinopse}',
                duracao='02:00:00',
                data_lancamento='2024-01-01',
                foto_capa='${dadosFilme.foto_capa}',
                valor_unitario=40

            where id='14';
       
create table tbl_classificacao(
	id int not null auto_increment primary key,
    faixa_etaria varchar(2) not null,
    classificacao varchar(45) not null,
    caracteristica varchar(100) not null,
    icone varchar(150) not null
);

create table tbl_sexo(
	id int not null auto_increment primary key,
    sigla varchar(1) not null,
    nome varchar(15) not null
);

create table tbl_nacionalidade(
	id int not null auto_increment primary key,
	nome varchar(45) not null
);

create table tbl_genero(
	id int not null auto_increment primary key,
	nome varchar(45) not null
);

create table tbl_ator(
	id int not null auto_increment primary key,
	nome varchar(100) not null,
    data_nascimento date not null,
    data_falecimento date,
    biografia text not null,
    foto varchar(150) not null,
    id_sexo int not null,
    constraint FK_SEXO_ATOR
    foreign key(id_sexo)
    references tbl_sexo(id)
);

select * from tbl_ator where id=2;

create table tbl_filme_ator(
	id int not null auto_increment primary key,
	id_filme int not null,
    id_ator int not null,
    
    constraint FK_ATOR_FILMEATOR
    foreign key(id_ator)
    references tbl_ator(id),
    
    constraint FK_FILME_FILMEATOR
    foreign key(id_filme)
    references tbl_filme(id)
);

create table tbl_nacionalidade_ator(
	id int not null auto_increment primary key,
	id_nacionalidade int not null,
    id_ator int not null,
    
    constraint FK_NACIONALIDADE_NACIONALIDADEATOR
    foreign key(id_nacionalidade)
    references tbl_nacionalidade(id),
    
    constraint FK_ATOR_NACIONALIDADEATOR
    foreign key(id_ator)
    references tbl_ator(id)
);

create table tbl_nacionalidade_diretor(
	id int not null auto_increment primary key,
	id_nacionalidade int not null,
    id_diretor int not null,
    
    constraint FK_NACIONALIDADE_NACIONALIDADEDIRETOR
    foreign key(id_nacionalidade)
    references tbl_nacionalidade(id),
    
    constraint FK_DIRETOR_NACIONALIDADEDIRETOR
    foreign key(id_diretor)
    references tbl_diretor(id)
);

select * from tbl_diretor;

create table tbl_nacionalidade_diretor(
	id int not null auto_increment primary key,
	id_nacionalidade int not null,
    id_diretor int not null,
    
    constraint FK_NACIONALIDADE_NACIONALIDADEDIRETOR
    foreign key(id_nacionalidade)
    references tbl_nacionalidade(id),
    
    constraint FK_DIRETOR_NACIONALIDADEDIRETOR
    foreign key(id_diretor)
    references tbl_diretor(id)
);

create table tbl_filme_diretor(
	id int not null auto_increment primary key,
	id_filme int not null,
    id_diretor int not null,
    
    constraint FK_DIRETOR_FILMEDIRETOR
    foreign key(id_diretor)
    references tbl_diretor(id),
    
    constraint FK_FILME_FILMEDIRETOR
    foreign key(id_filme)
    references tbl_filme(id)
);

create table tbl_filme_genero(
	id int not null auto_increment primary key,
	id_filme int not null,
    id_genero int not null,
    
    constraint FK_GENERO_FILMEGENERO
    foreign key(id_genero)
    references tbl_genero(id),
    
    constraint FK_FILME_FILMEGENERO
    foreign key(id_filme)
    references tbl_filme(id)
);

desc tbl_filme_genero;
select * from tbl_ator;
select * from tbl_filme;

create table tbl_diretor(
	id int not null auto_increment primary key,
	nome varchar(100) not null,
    data_nascimento date not null,
    data_falecimento date,
    biografia text not null,
    foto varchar(150) not null,
    id_sexo int not null,
    constraint FK_SEXO_DIRETOR
    foreign key(id_sexo)
    references tbl_sexo(id)
);

show tables;

select * from tbl_sexo;

insert into tbl_filme_ator(
	id_filme,
    id_ator
) values(
	1,
    1
),(
	1,
    2
),(
	2,
    3
),(
	2,
    4
);

select * from tbl_filme_genero;

insert into tbl_filme_genero(
	id_filme,
    id_genero
) values(
	1,
    3
),(
	1,
    4
),(
	1,
    14
),(
	2,
    4
),(
	2,
    6
),(
	2,
    9
),(
	2,
    11
);

select * from tbl_nacionalidade;
select * from tbl_nacionalidade_ator;

insert into tbl_nacionalidade_ator(
	id_nacionalidade,
    id_ator
) values(
	1,
    1
),(
	1,
    2
),(
	1,
    3
),(
	2,
    3
),(
	1,
    4
);

select * from tbl_diretor;
select * from tbl_nacionalidade_diretor;

insert into tbl_sexo(
	sigla,
    nome
) values(
	'M',
    'Masculino'
),(
	'F',
    'Feminino'
);

select * from tbl_genero;
select * from tbl_nacionalidade;
select * from tbl_nacionalidade_diretor;

desc tbl_genero;

insert into tbl_nacionalidade_diretor(
	id_nacionalidade,
    id_diretor
) values(
	1,
    1
),(
	2,
    2
),(
	4,
    2
);

alter table tbl_nacionalidade_diretor add constraint FK_NACIONALIDADE_NACIONALIDADEDIRETOR foreign key (id_nacionalidade) references tbl_nacionalidade(id);

select * from tbl_nacionalidade_diretor;

select * from tbl_filme_diretor;

insert into tbl_filme_diretor(
	id_filme,
    id_diretor
) values(
	1,
    1
),(
	2,
    2
);

select * from tbl_filme_ator;

select * from tbl_filme;

insert into tbl_filme_ator(
	id_ator,
    id_filme
) values(
	'M',
    'Masculino'
),(
	'F',
    'Feminino'
);

insert into tbl_classificacao(
	faixa_etaria,
    classificacao,
    caracteristica,
    icone
)values(
	"L",
    "Livre",
    "Não expõe crianças a conteúdo potencalmente prejudiciais.",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/DJCTQ_-_L.svg/480px-DJCTQ_-_L.svg.png"
),(
	"10",
    "Não recomendado para menores de 10 anos",
    "Conteúdo violento ou linguagem inapropriada para crianças, ainda que em menor itensidade.",
    "https://www.hebiatriabatistela.com.br/images/classificacoes/10.png"
),(
	"12",
    "Não recomendado para menores de 12 anos",
    "As cenas podem conter agressão física, consumo de drogas e insinuação sexual.",
    "https://www.hebiatriabatistela.com.br/images/classificacoes/12.png"
),(
	"14",
    "Não recomendado para menores de 14 anos",
    "Conteúdos mais violentos e/ou de linguagem sexual mais acentuada.",
    "https://www.hebiatriabatistela.com.br/images/classificacoes/14.png"
),(
	"16",
    "Não recomendado para menores de 16 anos",
    "Conteúdos mais violentos ou com conteúdo sexual mais intenso, com cenas de tortura, suicídio, estupro ou nudez total.",
    "https://www.hebiatriabatistela.com.br/images/classificacoes/16.png"
),(
	"18",
    "Não recomendado para menores de 18 anos",
    "Conteúdos violentos e sexuais extremos. Cenas de sexo, incesto, ou atos repetidos de tortura, mutilação ou abuso sexual.",
    "https://www.hebiatriabatistela.com.br/images/classificacoes/18.png"
);

select * from tbl_genero;

alter table tbl_filme
	add column id_genero int not null;

alter table tbl_filme
	drop column id_genero;

desc tbl_filme;

alter table tbl_filme
	add constraint FK_GENERO_FILME
    foreign key(id_genero)
    references tbl_genero(id);

insert into tbl_genero(
	nome
)values(
	'Terror'
),(
	'Suspense'
),(
	'Comédia'
),(
	'Romance'
),(
	'Ação'
),(
	'Ficcção Científica'
),(
	'Documentário'
),(
	'Musical'
),(
	'Aventura'
),(
	'Guerra'
),(
	'Thriller'
),(
	'Animação'
),(
	'Mistério'
),(
	'Drama'
),(
	'Filme Policial'
);

select * from tbl_genero;

insert into tbl_ator(
	nome,
    data_nascimento,
    biografia,
    foto,
    id_sexo
)values(
	'Sydney Sweeney',
    '1997-09-12',
    'Sydney Bernice Sweeney é uma atriz e produtora estadunidense, indicada duas vezes ao Emmy. Ela é conhecida principalmente por seus papéis como Cassie Howard em Euphoria, Olivia Mossbacher em The White Lotus, Bea em Anyone but You e Julia Carpenter em Madame Web.',
    'https://upload.wikimedia.org/wikipedia/commons/4/4f/Sydney_Sweeney_2019_by_Glenn_Francis.jpg',
    2
),(
	'Glen Powell',
    '1988-10-21',
    'Glen Thomas Powell Jr. é um ator, dublê, escritor e produtor norte-americano, conhecido por interpretar Thorn no filme Os Mercenários 3 e retratar o astronauta John Glenn no drama biográfico Hidden Figures, de 2017.',
    'https://upload.wikimedia.org/wikipedia/commons/d/d1/Glen_Powell_in_2016.jpg',
    1
),(
	'Timothée Chalamet',
    '1995-12-27',
    'Timothée Hal Chalamet, é um ator franco-americano. Começou sua carreira de ator em curtas-metragens, antes de aparecer na série de televisão Homeland, interpretando Finn Walden.',
    'https://upload.wikimedia.org/wikipedia/commons/a/a9/Interview_with_Timoth%C3%A9e_Chalamet%2C_2019.png',
    1
),(
	'Zendaya',
    '1996-09-01',
    'Zendaya Maree Stoermer Coleman, conhecida como Zendaya, é uma atriz, dançarina, modelo, cantora e compositora norte-americana, que ganhou notoriedade com seu trabalho na Disney Channel, como Rocky Blue na série Shake It Up e K.C. Cooper em K.C. Undercover.',
    'https://br.web.img2.acsta.net/c_310_420/pictures/19/12/26/23/19/0993801.jpg',
    2
);

select * from tbl_ator;

select A.nome,
		S.nome as sexo
from tbl_ator A
inner join
	tbl_sexo S
on A.id_sexo =  S.id;

select D.nome,
		S.nome as sexo
from tbl_diretor D
inner join
	tbl_sexo S
on D.id_sexo =  S.id;

insert into tbl_nacionalidade(
	nome
) values(
	'Estadunidense'
),(
	'Francês'
),(
	'Espanhol'
),(
	'Canadense'
),(
	'Brasileiro'
),(
	'Inglês'
),(
	'Alemão'
);

select * from tbl_nacionalidade;

insert into tbl_diretor(
	nome,
    data_nascimento,
    biografia,
    foto,
    id_sexo
)values(
	'Will Gluck',
    '1978-11-07',
    'Will Gluck é um diretor de cinema americano, produtor de cinema, roteirista e compositor.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/WGpix.jpg/200px-WGpix.jpg',
    1
),(
	'Denis Villenueve',
    '1967-10-03',
    'OC CQ Denis Villeneuve é um cineasta franco-canadense. Ele recebeu quatro vezes o Canadian Screen Award de Melhor Direção, vencendo por Maelström em 2001, Polytechnique em 2009, Incendies em 2010 e Enemy em 2013.',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Denis_Villeneuve_Cannes_2018.jpg/250px-Denis_Villeneuve_Cannes_2018.jpg',
    1
);