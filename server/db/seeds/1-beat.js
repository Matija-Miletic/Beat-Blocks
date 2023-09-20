/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries

  await knex('beats').insert([
    {
      id: 1,
      name: 'Coolest beat ever',
      cell_states: JSON.stringify([
        { id: 'cell-4-1', isActive: true },
        { id: 'cell-1-1', isActive: true },
        { id: 'cell-2-2', isActive: true },
        { id: 'cell-2-3', isActive: true },
        { id: 'cell-2-4', isActive: true },
        { id: 'cell-1-5', isActive: true },
        { id: 'cell-1-6', isActive: true },
        { id: 'cell-5-7', isActive: true },
        { id: 'cell-4-7', isActive: true },
        { id: 'cell-5-8', isActive: true },
        { id: 'cell-4-8', isActive: true },
      ]),
    },
  ])
}
