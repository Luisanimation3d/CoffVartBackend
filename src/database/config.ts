import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('postgres://coffvart:8y7MZktqFfjm1SXx9HLbUxyat8VYkZQq@dpg-ckkkbnbj89us7386mjk0-a.ohio-postgres.render.com/coffvart', {
    ssl: true
});