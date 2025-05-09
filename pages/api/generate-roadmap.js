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
    const { targetSkill, knowledgeLevel, timeline } = req.body;
    
    const prompt = `You are an expert career coach. Create a detailed, step-by-step learning roadmap for someone targeting the role or skill: ${targetSkill}. Current knowledge level: ${knowledgeLevel}. Timeline: ${timeline}. Include durations and recommended resources. Format the response in HTML with headings, numbered steps, and bullet points.`;

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800,
      temperature: 0.7,
    });

    const roadmap = response.data.choices[0].message.content.trim();
    res.status(200).json({ roadmap });
  } catch (error) {
    console.error('Error generating roadmap:', error);
    res.status(500).json({ message: 'Error generating roadmap', error: error.message });
  }
}
