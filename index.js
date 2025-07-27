import express from "express";
import mercadopago from "mercadopago";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Configure seu Access Token do Mercado Pago
mercadopago.configurations.setAccessToken("TEST-8980257649733227-072623-6440f77f6bfd7e0762c69d55d60ec956-1668501484");

app.post("/criar-preferencia", async (req, res) => {
  try {
    const { titulo, preco } = req.body;

    const preference = {
      items: [
        {
          title: titulo,
          unit_price: Number(preco),
          quantity: 1,
        },
      ],
      back_urls: {
        success: "https://seusite.com/sucesso",
        failure: "https://seusite.com/falha",
        pending: "https://seusite.com/pendente",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar preferência" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));