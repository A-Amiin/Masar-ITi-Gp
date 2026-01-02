/**
 * Agent Model
 * represents agent entity in the system
 */
export class Agent {
  constructor({
    id,
    name,
    phone,
    area,
    orders = 0,
    rating = 0,
    createdAt = new Date(),
  }) {
    this.id = id
    this.name = name
    this.phone = phone
    this.area = area
    this.orders = orders
    this.rating = rating
    this.createdAt = createdAt
  }
}
