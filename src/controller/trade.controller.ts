import express from "express";
import { idText } from "typescript";
import Article from "../model/article.model";

type NewArticle = {
  title: string;
  description: string;
  image: string;
  location: string;
  price: number;
  isAdjustable: boolean;
};

const router = express.Router();

router.post("/articles", async (req, res) => {
  const newArticle: NewArticle = req.body as NewArticle;
  if (!newArticle) {
    return res.status(400).json();
  }
  const article = await Article.create({
    title: newArticle.title,
    decription: newArticle.description,
    image: newArticle.image,
    location: newArticle.location,
    price: newArticle.price,
    isAdjustable: newArticle.isAdjustable,
  });
  return res.status(201).json({
    id: article.id,
  });
});

router.get("/articles", async (req, res) => {
  const { location } = req.query;
  if (location) {
    const articles = await Article.findAll({
      where: {
        location: location,
      },
    });
    return res.status(200).json(articles);
  }
  const articles = await Article.findAll();
  return res.status(200).json(articles);
});

export default router;
