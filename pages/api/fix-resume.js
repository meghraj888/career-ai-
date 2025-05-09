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
    const { resume, jobTitle } = req.body;
    
    const prompt = `You are an expert career coach and resume writer. Optimize the following resume for ATS systems and improve clarity, formatting, and impact. Target job title: ${jobTitle}. Resume content: """${resume}""" Provide the optimized resume in HTML format with headings, bullet points, and highlight key skills.`;

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800,
      temperature: 0.7,
    });

    const optimizedResume = response.data.choices[0].message.content.trim();
    res.status(200).json({ optimizedResume });
  } catch (error) {
    console.error('Error optimizing resume:', error);
    res.status(500).json({ message: 'Error optimizing resume', error: error.message });
  }
}
