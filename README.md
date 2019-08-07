
# facebook-enumerate-accounts
  
Este projeto tem como objetivo estudar uma possível vulnerábilidade do Facebook. Com ele vamos verificar e-mails e números de telefones que existem no Facebook  
  
![enter image description here](https://i.imgur.com/CtOnY4y.png)
  
Agora, um exercício mental; imagina você acordar um dia, tomar seu café, e ao ligar o noticiário e deparar com milhões de reclamações de pessoas reclamando sobre o Facebook ter enviado SMS para recuperar sua conta?  
  
Pois é disso que vou tratar nesse script!  
  
## Onde tudo começa
Na página https://www.facebook.com/recover/code/ temos apenas uma verificação de e-mail ou celular e passa para uma próxima etapa mostrando se a conta existe ou não existe, juntamente com envio de um SMS ou E-mail de recuperação de senha
  
## O que explorar?
  
Diante dessa possibilidade temos dois problemas
  
1 - Podemos enumerar se um número de telefone ou e-mail existe no Facebook
2 - Podemos enviar recuperação SMS/E-mail para estes mesmos telefones.
3 - Podemos invadir contas do Facebook (mais pra frente explico)
  
O bloqueio que o Facebook faz é via IP e muitos sites se sentem 
seguros ao fazer isso, mas é disso que vou tratar aqui. Não é seguro
  
**Trocar IP é fácil**
  
Seja com um modem 4G ou simplesmente com proxys do tipo "backconnect rotating proxys" podemos assumir milhões de IPs a cada nova requisição, e o Facebook nem perceberia que estaria sofrendo um ataque em seus servidores em talvez, todos e-mails da plataforma. 
  
Veja estas soluções:
https://luminati.io
https://www.scraperapi.com/blog/the-10-best-rotating-proxy-services-for-web-scraping
  
## Qual impacto dessa falha?
  
De um modo geral isso afeta a segurança das contas.  
  
O código de confirmação enviado por e-mail ou SMS é de apenas 6 dígitos, ou 1 milhão de combinações. Um ataque a uma vítima em específico seria ineficaz após um bloqueio por muitas tentativas (ao contrário do [Instagram recentemente](https://www.forbes.com/sites/leemathews/2019/07/15/hacker-discovers-a-simple-way-to-hijack-any-instagram-account/)). 
<br>
No bloqueio de IP aparecerá uma mensagem "Ops você errou muitas vezes o código de recuperação para esta conta". Mas, e se apenas mas, utilizarmos **milhões** de requisições em **milhões** de alvos?  
  
É aí que trabalhamos com possibilidades, utilizando um servidor que consiga enviar 1 milhão de requests em um único dia temos a chance clara de acertar 1 único código em uma conta. Parece muito? Não é. 1 milhão de requisições são facilmente fraudáveis utilizando diferentes proxy mostrada acima! Sinceramente nem dá pra dizer que é um brute force.  
  
  
## Como então proteger os meus sistemas?  
  
O melhor jeito de se proteger contra ações automatizadas assim é sempre utilizar CAPTCHA em requisições sensíveis como essa. Mas também o Facebook facilita muito ao enviar um código de APENAS "999.999 combinações". Que tal misturar letras e números?  AX09100 por exemplo poderia elevar as combinações pra casa das centenas de milhões, tornando um brute force mais ineficaz.  
  
    
Por questões de ética, meu código em si apenas gera números de telefones aleatórios para fazer a captação e detectar se a conta existe ou não. Não sou responsável por outras abordagens maliciosas pra este tipo de ideia.  
  
    
      
Muito obrigado pela leitura
Meu e-mail email[arroba]brunodasilva.com
  
  
Até mais.
