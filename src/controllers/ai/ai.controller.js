import { openai } from '../../config.js'

export const test = async (req, res) => {
  const data = req.body

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "assistant",
          content: data.prompt
        }
      ],
      max_tokens: 4050,
      temperature: 0,
    });

    res.json({
      status: 'SUCCESS',
      data: response.data.choices[0].message
    })

    // const response = await openai.createCompletion({
    //   model: "davinci",
    //   prompt: data.prompt,
    //   max_tokens: 200,
    //   temperature: 0,
    // });

    // res.json({
    //   status: 'SUCCESS',
    //   data: response.data.choices[0].text
    // })
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      // data: 'An error has occurred'
      data: 'Ha ocurrido un error'
    })
  }
}