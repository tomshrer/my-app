import Property from '#models/property'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    const propertiesData = []

    for (let i = 0; i < 10; i++) {
      propertiesData.push({
        name: faker.helpers.arrayElement([
          'House Divide',
          'Cozy Apartment',
          'Modern Loft',
          'Sunny Studio',
          'Charming Villa',
        ]),
        address: `${faker.location.streetAddress}, ${faker.location.zipCode()} ${faker.location.city()}`,
      })
    }

    await Property.createMany(propertiesData)
  }
}
