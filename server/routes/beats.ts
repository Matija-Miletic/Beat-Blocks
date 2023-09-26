import { Router } from 'express'

import * as db from '../db/db.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const beats = await db.getAllBeats()

    res.json({ beats: beats.map((beat) => beat.name) })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/:name', async (req, res) => {
  const name = req.params.name
  // console.log('at router')
  try {
    const presetBeat = await db.getPresetBeat(name)
    // console.log('presetBeat', presetBeat)
    res.json(presetBeat)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router

router.post(`/add`, async (req, res) => {
  console.log('at post route')
  try {
    const beat = req.body.newBeat

    await db.addNewBeat(beat)

    res.sendStatus(204)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(error.response.status || 500).json(error.response.body)
  }
})
