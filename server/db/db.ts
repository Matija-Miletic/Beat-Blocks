import { NewBeat } from '../../models/beats.ts'
import connection from './connection.ts'

export async function getAllBeats(db = connection) {
  return db('beats').select()
}

export async function getPresetBeat(name: string, db = connection) {
  return db('beats').where('name', name).select()
}

export async function addNewBeat(beat: NewBeat, db = connection) {
  return db('beats').insert(beat).returning('*')
}
