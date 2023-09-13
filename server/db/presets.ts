import connection from './connection.ts'
import { Preset } from '../../models/preset.ts'

export async function getAllPresets(db = connection): Promise<Preset[]> {
  return db('presets').select()
}

export async function addPreset(
  preset: Preset,
  db = connection,
): Promise<void> {
  await db('presets').insert(preset)
}

export async function deletePreset(id: number, db = connection): Promise<void> {
  await db('presets').where({ id }).delete()
}
