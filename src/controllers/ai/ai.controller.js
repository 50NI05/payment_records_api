import { openai } from '../../config.js'

export const test = async (req, res) => {
  const data = req.body

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content: "dime las 11 mejores jugadores del real madrid con su estadisticas"
        }
      ],
      max_tokens: 4050,
      temperature: 0,
    });

    res.json({
      status: 'SUCCESS',
      data: response.data.choices[0].message
    })
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      // data: 'An error has occurred'
      data: 'Ha ocurrido un error'
    })
  }
}