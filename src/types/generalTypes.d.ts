import { OrderItem } from 'sequelize/types';

export interface optionsPagination {
	page: number;
	limit: number;
	paginate: number;
	order: OrderItem;
}