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
    const { jobTitle, skills, experience } = req.body;
    
    const prompt = `You are an expert interviewer. Generate a list of technical, behavioral, and situational interview questions tailored for the job title: ${jobTitle}. Key skills: ${skills}. Experience summary: ${experience}. Provide tips for answering each question. Format the response in HTML with headings and bullet points.`;

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800,
      temperature: 0.7,
    });

    const questions = response.data.choices[0].message.content.trim();
    res.status(200).json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({ message: 'Error generating questions', error: error.message });
  }
}
