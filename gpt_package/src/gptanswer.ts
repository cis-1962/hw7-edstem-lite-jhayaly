import OpenAI from 'openai';

const client = new OpenAI();

const processQuestion = async(question) => {
    const stream = await client.beta.chat.completions.stream({
    model: 'gpt-4',
    messages: [{ role: 'user', content: question }],
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }

  const chatCompletion = await stream.finalChatCompletion();
  // eslint-disable-next-line no-console
  console.log(chatCompletion);
  return  chatCompletion;
}

export default processQuestion;