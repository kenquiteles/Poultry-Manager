import { GoogleGenerativeAI } from '@google/generative-ai';
import { Poultry } from '../models/Poultry.js';
import { Finance } from '../models/Finance.js';
import { Production } from '../models/Production.js';
import { Inventory } from '../models/Inventory.js';

export const getGeminiAdvice = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });

    const userId = req.user._id;
    const poultry = await Poultry.find({
      user: userId,
      isDeleted: false
    });

    const finance = await Finance.find({
      user: userId,
      isDeleted: false
    });

    const production = await Production.find({
      user: userId,
      isDeleted: false
    });

    const inventory = await Inventory.find({
      user: userId,
      isDeleted: false
    });

    const totalActive = poultry.reduce((s, p) => s + p.active, 0);
    const totalEggs = production.reduce((s, p) => s + p.eggCount, 0);
    const income = finance.filter(f => f.transaction === 'Income').reduce((s, f) => s + f.amount * f.quantity, 0);
    const expenses = finance.filter(f => f.transaction === 'Expense').reduce((s, f) => s + f.amount * f.quantity, 0);
    const lowStock = inventory.filter(i => i.quantity <= i.lowStockThreshold).map(i => i.itemName);

    const prompt =
      ` You are a poultry farm management assistant.
    Farm data:
    - Active chickens: ${totalActive}
    - Total eggs recorded: ${totalEggs}
    - Total income: ${income}
    - Total expenses: ${expenses}
    - Low stock items: ${lowStock.join(', ') || 'None'}
    Give 3 practical recommendations for the farmer.
    Rules:
    - Do NOT use markdown syntax (no asterisks **, no hash tags #, no bullet symbols *).
    - Keep the response short, clear, plain text, and easy to understand.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const advice = response.text();

    res.json({
      advice,
      summary: {
        totalActive,
        totalEggs,
        income,
        expenses,
        lowStock,
      },
    });

  } catch (error) {
    console.error('FULL GEMINI ERROR:');
    console.error(error); console.error('MESSAGE:', error.message);
    res.status(500).json({
      message: 'AI request failed', error: error.message,
    });
  }
};