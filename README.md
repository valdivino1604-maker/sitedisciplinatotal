# Disciplina Total

Site oficial do livro **Disciplina em 30 Dias**.

## Domínio

Domínio principal: `disciplinatotal.com.br`

## Como publicar na Cloudflare Pages

1. Entre no painel da Cloudflare.
2. Vá em **Workers & Pages**.
3. Clique em **Create application**.
4. Escolha **Pages** e depois **Connect to Git**.
5. Selecione o repositório `sitedisciplinatotal`.
6. Configuração de build:
   - Framework preset: **None**
   - Build command: deixar vazio
   - Build output directory: `/`
7. Clique em **Save and Deploy**.
8. Depois vá em **Custom domains** e adicione:
   - `disciplinatotal.com.br`
   - `www.disciplinatotal.com.br`

## DNS recomendado na Cloudflare

Quando o projeto Pages estiver criado, a Cloudflare vai indicar o endereço final do Pages. Normalmente fica assim:

- `disciplinatotal.com.br` como domínio raiz no próprio Pages
- `www` apontando para o projeto Pages

## Editar link de compra

No arquivo `index.html`, procure por:

```html
https://app.hotmart.com/
```

Troque pelo link real da Hotmart.
