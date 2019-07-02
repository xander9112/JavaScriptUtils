const paginate = (array, page_size, page_number) => {
  --page_number;

  return array.slice(page_number * page_size, (page_number + 1) * page_size);
};

export { paginate };
