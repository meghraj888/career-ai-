import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { skills, experienceLevel, careerGoals } = req.body;
    
    const prompt = `You are a career advisor. Based on the following information, suggest 3 detailed career paths including job titles, key skills, potential salary ranges, and advancement opportunities. Skills: ${skills}. Experience Level: ${experienceLevel}. Career Goals: ${careerGoals}. Format the response in HTML with headings and bullet points.`;

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800,
      temperature: 0.7,
    });

    const careerPaths = response.data.choices[0].message.content.trim();
    res.status(200).json({ careerPaths });
  } catch (error) {
    console.error('Error generating career paths:', error);
    res.status(500).json({ message: 'Error generating career paths', error: error.message });
  }
}
