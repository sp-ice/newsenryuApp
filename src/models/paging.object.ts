export interface PagingObject {
	current_page: number,
	data: any[],
	last_page: number,
	next_page_url: string,
	prev_page_url: string,
	from: number,
	to: number,
	total: number
}