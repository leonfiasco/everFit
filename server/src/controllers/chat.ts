import { Request, Response } from "express";
import openai from "../config/openai";
import Chat from "../models/Chat";

exports.chatWithGPT = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    if (!query) return res.status(400).json({ message: "query required!" });

    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL,
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
    });

    const responseContent = completion.choices[0].message.content;

    // Save to MongoDB
    const newChat = new Chat({
      query,
      response: responseContent,
      aiModel: process.env.AI_MODEL,
    });

    await newChat.save();

    res.json({
      data: completion.choices[0].message,
      mongoId: newChat._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
