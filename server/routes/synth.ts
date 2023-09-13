import express from 'express'
import { getAllPresets, addPreset, deletePreset } from '../db/presets.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  const presets = await getAllPresets()
  res.json({ presets })
})

router.post('/', async (req, res) => {
  const { preset } = req.body
  await addPreset(preset)
  res.status(201).json({ message: 'Preset added' })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await deletePreset(Number(id))
  res.status(200).json({ message: 'Preset deleted' })
})

export default router
